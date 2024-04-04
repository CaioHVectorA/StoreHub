import { startServer } from "./server";

startServer((server) => {
    console.log(`Server running at PORT ${server.port} 🚀`)
})