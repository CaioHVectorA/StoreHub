import type { Methods } from "../../types/methods";
import type { Request as ServerRequest } from "../../types/request";

const METHODS_WITHOUT_BODY = ['DELETE', 'GET']

export async function getRequest(request: Request) {
    let body = {};
    const { pathname } = new URL(request.url)
    const cookies = request.headers.get('cookie')
    if (!METHODS_WITHOUT_BODY.includes(request.method)) body = await request.json()
    const req = { body, cookies, headers: request.headers, method: request.method as Methods, pathname, url: request.url } satisfies Omit<Omit<ServerRequest, 'params'>, 'query'>
    return req
}