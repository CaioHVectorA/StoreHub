import { UserService } from "../services/user.service";
import type { Controller } from "../types/controller";
import type { ReqResCallback } from "../types/router-type";

export class UserController {
    service = new UserService()
    create: ReqResCallback = async (req, res) => {
        const body = req.body
        const response = await this.service.create(body)
        return res.json(response)
    }
    login: ReqResCallback = async (req, res) => {
        const body = req.body
        const response = await this.service.login(body)
        return res.json(response)
    }
    delete: ReqResCallback = async (req, res) => {};
    edit: ReqResCallback = async (req, res) => {};
    getUserInfos: ReqResCallback = async (req, res) => {};
    getOrders: ReqResCallback = async (req, res) => {};
    get: ReqResCallback = async (req, res) => {};
    getInfos: ReqResCallback = async (req, res) => {} 
}