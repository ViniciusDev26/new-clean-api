import { HttpRequest } from './HttpRequest'
import { HttpResponse } from './HttpResponse'

export interface Controller {
  handle: (httpRequest: HttpRequest) => HttpResponse
}
