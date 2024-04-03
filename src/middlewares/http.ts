import type { Serve } from "bun";

export const ServerConfig = {
    fetch(request, server) {
        return Response.json({})
    },
    
} as Serve