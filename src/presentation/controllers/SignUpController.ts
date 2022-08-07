import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../contracts'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest } from '../helpers/badRequest'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (httpRequest.body[field]) continue

      return badRequest(new MissingParamError(field))
    }

    const { email } = httpRequest.body
    if (!this.emailValidator.isValid(email)) return badRequest(new InvalidParamError('email'))

    return {
      statusCode: 201,
      body: 'created with success'
    }
  }
}
