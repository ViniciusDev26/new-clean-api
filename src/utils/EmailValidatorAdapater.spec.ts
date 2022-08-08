import validator from 'validator'
import { EmailValidatorAdapter } from './EmailValidatorAdapter'

jest.mock('validator')

describe('EmailValidator Adapter', () => {
  let sut: EmailValidatorAdapter

  beforeEach(() => {
    jest.spyOn(validator, 'isEmail').mockReturnValue(true)

    sut = new EmailValidatorAdapter()
  })

  it('Should return false if validator returns false', () => {
    const email = 'invalidEmail@mail.com'
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = sut.isValid(email)

    expect(isValid).toBe(false)
  })

  it('Should return true if validator returns true', () => {
    const email = 'invalidEmail@mail.com'

    const isValid = sut.isValid(email)

    expect(isValid).toBe(true)
  })

  it('Should call validator with correct params', () => {
    const email = 'invalidEmail@mail.com'
    const validatorSpy = jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    sut.isValid(email)

    expect(validatorSpy).toHaveBeenCalledWith('invalidEmail@mail.com')
  })
})
