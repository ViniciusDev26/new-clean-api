import { MissingParamError } from '../errors/missing-param-error'

export class SignUpController {
  handle (httpRequest: any): any {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (httpRequest.body[field]) continue

      return {
        statusCode: 400,
        body: new MissingParamError(field)
      }
    }

    return {
      statusCode: 200
    }
  }
}
