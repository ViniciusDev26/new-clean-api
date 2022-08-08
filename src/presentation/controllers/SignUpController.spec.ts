import { MissingParamError, InvalidParamError, InternalServerError } from '../errors'
import { SignUpController } from './SignUpController'

import { MockProxy, mock } from 'jest-mock-extended'
import { AddAccount } from '../../domain/features/AddAccount'
import { EmailValidator } from '../contracts/EmailValidator'

describe('SignUp Controller', () => {
  let emailValidator: MockProxy<EmailValidator>
  let addAccount: MockProxy<AddAccount>
  let sut: SignUpController

  beforeEach(() => {
    emailValidator = mock()
    emailValidator.isValid.mockReturnValue(true)

    addAccount = mock()
    addAccount.add.mockResolvedValue({
      id: 'validId',
      name: 'validName',
      email: 'validEmail@mail.com',
      password: 'validPassword'
    })

    sut = new SignUpController(emailValidator, addAccount)
  })

  it('should return 400 if no name is provided', async () => {
    const httpRequest = {
      body: {
        name: '',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  it('should return 400 if no email is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: '',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  it('should return 400 if no password is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: ''
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  it('should return 400 an invalid email is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_mail@mail.com',
        password: 'any_password'
      }
    }
    emailValidator.isValid.mockReturnValueOnce(false)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  it('should call EmailValidator with correct email', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'valid_mail@mail.com',
        password: 'any_password'
      }
    }

    await sut.handle(httpRequest)

    expect(emailValidator.isValid).toHaveBeenCalledTimes(1)
    expect(emailValidator.isValid).toHaveBeenCalledWith('valid_mail@mail.com')
  })

  it('should return 500 if email validator throws', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    emailValidator.isValid.mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError())
  })

  it('should call AddAccount with correct values', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    await sut.handle(httpRequest)

    expect(addAccount.add).toHaveBeenCalledTimes(1)
    expect(addAccount.add).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  it('should return 500 if AddAccount throws', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    addAccount.add.mockImplementationOnce(() => {
      throw new Error()
    })

    const promiseResponse = await sut.handle(httpRequest)

    expect(promiseResponse.statusCode).toBe(500)
    expect(promiseResponse.body).toEqual(new InternalServerError())
  })

  it('should return 201 if valid data is provided', async () => {
    const httpRequest = {
      body: {
        name: 'validName',
        email: 'validEmail@mail.com',
        password: 'validPassword'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({
      id: 'validId',
      name: 'validName',
      email: 'validEmail@mail.com'
    })
  })
})
