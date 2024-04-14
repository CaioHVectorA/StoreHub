import { AppError } from "../middlewares/appError";
import { UserRepository } from "../repositories/user.repository";
import type { UserInput, UserLoginNeeded } from "../models/User";
import { USER_VALIDATOR, validator } from "../lib/validator";
export class UserService {
    repo = new UserRepository()
    async create(data: UserInput) {
        const id = crypto.randomUUID()
        validator(USER_VALIDATOR)(data)
        const password = await Bun.password.hash(data.password)
        const response = await this.repo.create({ ...data, id, password })
        return response
    }
    async login(data: UserLoginNeeded) {
        const { id, password: passwordInDatabase } = await this.repo.login(data)
        const rightPass = await Bun.password.verify(data.password, passwordInDatabase)
        if (!rightPass) throw new AppError('Senha incorreta!', 401)
        return await this.repo.getUserInfos(id)
    }
    async getUserInfos() {}
    async edit() {}
    async getOrders() {}
    async delete() {}
    async get() {}
}