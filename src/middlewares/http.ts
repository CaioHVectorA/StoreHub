import type { Serve } from "bun";
import type { Methods } from "../types/methods";
import { app } from "../lib/application";
import { Router } from "../lib/router";
import type { ServerResponse } from "../types/response";
import type { Request } from "../types/request";
import type { ApplicationProps } from "../types/application";
import { UserRepository } from "../repositories/user.repository";
const METHODS_WITHOUT_BODY = ['DELETE', 'GET']
const router = new Router()
export const ServerConfig = {
    async fetch(request, server) {
        let body = {};
        let response: Response = new Response();
        const cookies = request.headers.get('cookie')
        if (!METHODS_WITHOUT_BODY.includes(request.method)) body = await request.json()
        const { pathname } = new URL(request.url)
        const req = { body, cookies, headers: request.headers, method: request.method as Methods, pathname, url: request.url } satisfies Omit<Omit<Request, 'params'>, 'query'>
        const res = { 
            json: (data) => {
                response = new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' }, status: 200 })
                return response
            },
            status: (status, json?: any) => {
                response = new Response(JSON.stringify(json), { status: status })
                return response
            }
         } satisfies ServerResponse
        app({ request: req, response: res }, router)
        return response
    }
} as Serve