import { UserController } from "../controllers/user.controller";
import { Router } from "../lib/router";

export const userRoutes = new Router()
const controller = new UserController()
userRoutes.post('/', controller.create)
userRoutes.post('/login', controller.login)
userRoutes.put('/:id', controller.edit)
userRoutes.get('/infos/:id', controller.getUserInfos)
userRoutes.get('/orders/:id', controller.getOrders)
userRoutes.del('/:id', controller.delete)