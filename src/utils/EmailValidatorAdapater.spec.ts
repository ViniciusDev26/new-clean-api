import { EmailValidatorAdapter } from './EmailValidatorAdapter'

describe('EmailValidator Adapter', () => {
  let sut: EmailValidatorAdapter

  beforeEach(() => {
    sut = new EmailValidatorAdapter()
  })

  it('Should return false if validator returns false', () => {
    const email = 'invalidEmail@mail.com'

    const isValid = sut.isValid(email)

    expect(isValid).toBe(false)
  })
})
