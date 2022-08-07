import { HttpRequest, HttpResponse, Controller } from '../contracts'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers/badRequest'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (httpRequest.body[field]) continue

      return badRequest(new MissingParamError(field))
    }

    return {
      statusCode: 201,
      body: 'created with success'
    }
  }
}
