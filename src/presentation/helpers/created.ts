import { HttpResponse } from '../contracts'

export function created (data: any): HttpResponse {
  return {
    statusCode: 201,
    body: data
  }
}
