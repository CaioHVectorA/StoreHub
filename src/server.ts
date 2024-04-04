import type { Server } from "bun";
import { ServerConfig } from "./middlewares/http";
    export const startServer = (callback = (server: Server) => console.log('Server is running!')) => {
    const server = Bun.serve({
        ...ServerConfig,
    })
    callback(server)
} 