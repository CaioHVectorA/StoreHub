import type { Serve } from "bun";
import { app } from "../lib/application";
import { getRequest } from "../lib/utils/getReq";
import { getResponse } from "../lib/response";
import { routes } from "../routes";
import type { ServerResponse } from "../types/response";



export const ServerConfig = {
    async fetch(request, server) {
        let response: Response = new Response();
        const req = await getRequest(request)
        const res = { 
            json: (data) => {
                response = new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' }, status: 200 })
                return response
            },
            status: (status, json?: any) => {
                console.log('STATUS: Called')
                response = new Response(JSON.stringify(json), { status: status })
                return response
            }
         } satisfies ServerResponse
        await app({ request: req, response: res }, routes)
        return response
    }
} as Serve