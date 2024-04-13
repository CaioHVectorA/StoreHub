import { UserController } from "../controllers/user.controller";
import { Router } from "../lib/router";

export const userRoutes = new Router()
const controller = new UserController()
userRoutes.post('/', controller.create)
userRoutes.post('/login', controller.login)