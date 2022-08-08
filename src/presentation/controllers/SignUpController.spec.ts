import { MissingParamError, InvalidParamError } from '../errors'
import { SignUpController } from './SignUpController'

import { MockProxy, mock } from 'jest-mock-extended'
import { EmailValidator } from '../contracts'

describe('SignUp Controller', () => {
  let emailValidator: MockProxy<EmailValidator>
  let sut: SignUpController

  beforeEach(() => {
    emailValidator = mock()
    emailValidator.isValid.mockReturnValue(true)

    sut = new SignUpController(emailValidator)
  })

  it('should return 400 if no name is provided', () => {
    const httpRequest = {
      body: {
        name: '',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  it('should return 400 if no email is provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: '',
        password: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  it('should return 400 if no password is provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: ''
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  it('should return 400 an invalid email is provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_mail@mail.com',
        password: 'any_password'
      }
    }
    emailValidator.isValid.mockReturnValue(false)

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  it('should call EmailValidator with correct email', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'valid_mail@mail.com',
        password: 'any_password'
      }
    }

    sut.handle(httpRequest)

    expect(emailValidator.isValid).toHaveBeenCalledTimes(1)
    expect(emailValidator.isValid).toHaveBeenCalledWith('valid_mail@mail.com')
  })

  it('should return 201 if valid data is provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toBe('created with success')
  })
})
