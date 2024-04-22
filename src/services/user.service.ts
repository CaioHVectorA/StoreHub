import { AppError } from "../middlewares/appError";
import { UserRepository } from "../repositories/user.repository";
import type { UserInput, UserLoginNeeded } from "../models/user";
import { USER_VALIDATOR, validator } from "../lib/validator";
export class UserService {
    repo = new UserRepository()
    async create(data: UserInput) {
        const id = crypto.randomUUID()
        validator(USER_VALIDATOR)(data)
        const password = await Bun.password.hash(data.password)
        await this.repo.create({ ...data, id, password })
        return { id }
    }
    async login(data: UserLoginNeeded) {
        const { id, password: passwordInDatabase } = await this.repo.login(data)
        const rightPass = await Bun.password.verify(data.password, passwordInDatabase)
        if (!rightPass) throw new AppError('Senha incorreta!', 401)
        return this.repo.getUserInfos(id)
    }
    async getUserInfos(id: string) {
        return this.repo.getUserInfos(id)
    }
    async edit(data: { id: string, email?: string, username?: string, password?: string, picture?: string}) {
        if (!data.id) throw new AppError('ID não informado!', 400)
        if (!data.email && !data.username && !data.password && !data.picture) throw new AppError('Ausência de credenciais!', 400)
        return this.repo.edit(data)
    }
    async getOrders(id: string) {
        console.log('AAAAA')
        return this.repo.getOrders(id)
    }
    async delete(id: string) {
        return this.repo.delete(id)
    }
    async getAllUsers(limit = 10) {
        return this.repo.getAllUsers(limit)
    }
}