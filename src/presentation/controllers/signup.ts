import { HttpRequest, HttpResponse } from '../contracts'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/badRequest'

export class SignUpController {
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
