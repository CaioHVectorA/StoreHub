import type { Serve } from "bun";
import type { Methods } from "../types/methods";
import { app } from "../lib/application";
import { Router } from "../lib/router";
import type { ServerResponse } from "../types/response";
import type { Request } from "../types/request";
import type { ApplicationProps } from "../types/application";
const METHODS_WITHOUT_BODY = ['DELETE', 'GET']
const routerExample = new Router()
routerExample.get('/teste', (req, res) => {
    res.json("Hello world")
})
routerExample.post('/', (req, res) => {
    res.json(req.body)
})
routerExample.get('/:id', (req, res) => {
    res.json(req.params)
})
routerExample.get('/:route/:routi', (req, res) => {
    res.json(req.params)
})
const router = new Router()
router.use(routerExample)
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
        app({ request: req, response: res }, routerExample)
        return response
    }
} as Serve