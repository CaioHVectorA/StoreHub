import type { Serve } from "bun";
import type { Methods } from "../types/methods";
import { translateFormData } from "../lib/translateFormData";
import { app } from "../lib/application";
const METHODS_WITHOUT_BODY = ['DELETE', 'GET']
export const ServerConfig = {
    async fetch(request, server) {
        let body = {}
        if (!METHODS_WITHOUT_BODY.includes(request.method)) body = await request.json()
        const { pathname, searchParams } = new URL(request.url)
        return new Response(JSON.stringify(body))
    }
} as Serve