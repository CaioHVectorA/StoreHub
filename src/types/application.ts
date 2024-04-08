import type { Methods } from "./methods"
import type { Request } from "./request"
import type { ServerResponse } from "./response"

export type ApplicationProps = { request: Omit<Omit<Request, 'params'>, 'query'>, response: ServerResponse }
