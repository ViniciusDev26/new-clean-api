import { AddAccount } from '../../domain/features/AddAccount'
import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../contracts'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, created, serverError } from '../helpers'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password']
      for (const field of requiredFields) {
        if (httpRequest.body[field]) continue

        return badRequest(new MissingParamError(field))
      }

      const { name, email, password } = httpRequest.body
      if (!this.emailValidator.isValid(email)) return badRequest(new InvalidParamError('email'))

      await this.addAccount.add({
        name,
        email,
        password
      })
      return created('created with success')
    } catch (error) {
      return serverError()
    }
  }
}
