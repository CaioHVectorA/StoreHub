import { UserService } from "../services/user.service";
import type { Controller } from "../types/controller";
import type { ReqResCallback } from "../types/router-type";

export class UserController {
    private service = new UserService()
    create: ReqResCallback = async (req, res) => {
        const body = req.body
        const response = await this.service.create(body)
        return res.status(201, response)
    }
    login: ReqResCallback = async (req, res) => {
        const body = req.body
        const response = await this.service.login(body)
        return res.json(response)
    }
    delete: ReqResCallback = async (req, res) => {
        const id = req.params.id
        const response = await this.service.delete(id)
        return res.json(response)
    };
    edit: ReqResCallback = async (req, res) => {
        const body = req.body
        const id = req.params.id
        const response = await this.service.edit({ id, ...body })
        return res.json(response)
    };
    getUserInfos: ReqResCallback = async (req, res) => {
        const id = req.params.id
        const response = await this.service.getUserInfos(id)
        return res.json(response)
    };
    getOrders: ReqResCallback = async (req, res) => {
        const id = req.params.id
        console.log(id)
        const response = await this.service.getOrders(id)
        return res.json(response)
    };
}