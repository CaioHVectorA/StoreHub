import { Router } from "../lib/router";
import { userRoutes } from "./user.router";

export const routes = new Router()

routes.use(userRoutes, '/user')