import { Router } from "../lib/router";
import { userRoutes } from "./user.router";
import { storeRoutes } from './store.router'
export const routes = new Router()
routes.get('/', (req, res) => {
    return res.json("Ping!")
})
routes.use(userRoutes, '/user')
routes.use(storeRoutes, '/store')