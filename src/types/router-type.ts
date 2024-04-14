import type { Methods } from "./methods"
import type { Request } from "./request"
import type { ServerResponse } from "./response"
//todo: improve type (receive request and returns an mounted response)
export type ReqResCallback = ((request: Request, response: ServerResponse) => Promise<any> | any)
export type Route = {
    callback: ReqResCallback,
    method: Methods
    pathname: string
}
// validate types
export type RouterInterface = {
    routes: Route[]
    get: (pathname: string, handler: ReqResCallback) => void
    post: (pathname: string, handler: ReqResCallback) => void
    put: (pathname: string, handler: ReqResCallback) => void
    del: (pathname: string, handler: ReqResCallback) => void
    use: (handle: Route | RouterInterface) => void
}