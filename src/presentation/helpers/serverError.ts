import { HttpResponse } from '../contracts'
import { InternalServerError } from '../errors'

export function serverError (): HttpResponse {
  return {
    statusCode: 500,
    body: new InternalServerError()
  }
}
