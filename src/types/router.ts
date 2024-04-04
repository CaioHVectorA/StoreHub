import type { Methods } from "./methods"
//todo: improve type (receive request and returns an mounted response)
type Callback = (request: unknown, response: unknown) => unknown
type Route = {
    callback: Callback,
    method: Methods
    pathname: string
}
// validate types
export type Router = {
    get: (pathname: string, handler: Callback) => Route
    post: (pathname: string, handler: Callback) => Route
    put: (pathname: string, handler: Callback) => Route
    delete: (pathname: string, handler: Callback) => Route
    use: (handle: Route | Router) => Route
}