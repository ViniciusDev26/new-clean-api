import validator from 'validator'
import { EmailValidatorAdapter } from './EmailValidatorAdapter'

jest.mock('validator', () => ({
  isEmail: () => true
}))

describe('EmailValidator Adapter', () => {
  let sut: EmailValidatorAdapter

  beforeEach(() => {
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
})
