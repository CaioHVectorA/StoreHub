import { StoreService } from "@/services/store.service";
import type { ReqResCallback } from "@/types/router-type";

export class StoreController {
    private service = new StoreService();

    create: ReqResCallback = async (req, res) => {
        const body = req.body;
        const response = await this.service.create(body);
        return res.status(201, response);
    }
    get: ReqResCallback = async (req, res) => {
        const id = req.params.id;
        const response = await this.service.get(Number(id));
        return res.json(response);
    }
    changeManager: ReqResCallback = async (req, res) => {
        const { store_id, manager_id } = req.body;
        await this.service.changeManager(store_id, manager_id);
        return res.json({ message: 'Manager modificado!' });
    }
    disable: ReqResCallback = async (req, res) => {
        const id = req.params.id;
        const response = await this.service.disable(Number(id));
        return res.json({ Message: 'Loja desativada!'});
    }
    close: ReqResCallback = async (req, res) => {
        const id = req.params.id;
        const response = await this.service.close(Number(id));
        return res.json({ Message: 'Loja fechada!'});
    }
    getProducts: ReqResCallback = async (req, res) => {
        const id = req.params.id;
        const products = await this.service.getProducts(Number(id));
        return res.json(products);
    }
}