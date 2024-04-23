import { StoreController } from "@/controllers/store.controller";
import { Router } from "@/lib/router";

export const storeRoutes = new Router()
const storeController = new StoreController();
storeRoutes.get('/products/:id', storeController.getProducts);
storeRoutes.get('/:id', storeController.get);
storeRoutes.post('/', storeController.create);
storeRoutes.put('/change-manager', storeController.changeManager);
storeRoutes.put('/disable/:id', storeController.disable);
storeRoutes.put('/close/:id', storeController.close);