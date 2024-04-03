import { ServerConfig } from "./middlewares/http";

export const startServer = () => {
    Bun.serve({
        ...ServerConfig
    })
    console.log('Server is running!')
} 