import { HttpRequest, HttpResponse } from '../contracts'
import { MissingParamError } from '../errors/missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (httpRequest.body[field]) continue

      return {
        statusCode: 400,
        body: new MissingParamError(field)
      }
    }

    return {
      statusCode: 200,
      body: null
    }
  }
}
