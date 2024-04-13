import { Repository } from "./base";
import { USER_TABLE, type User, type UserInput, type UserLoginNeeded } from "../models/User";
import { AppError } from "../middlewares/appError";
export class UserRepository extends Repository {
    constructor() {
        super()
        this.db.run(USER_TABLE)
    }
    create({ CPF, email, password, username, id }: UserInput & { id: string }) {
        const alreadyExists = this.db.query("SELECT id from user WHERE id = ?1 OR email = ?2 OR CPF = ?3;   ").get(id, email, CPF)
        if (alreadyExists) throw new AppError('Usuário já existe no sistema!')
        const insert = this.db.prepare("INSERT INTO user (username, email, password, CPF, id) VALUES (?1, ?2, ?3, ?4, ?5);")
        insert.run(username, email, password, CPF, id)
        return "Usuário criado com sucesso!"
    }
    //todo:
    login({ login }: UserLoginNeeded) {
        const userFound = this.db.query(`SELECT password, id from user WHERE email = ?1 OR CPF = ?1;`).get(login) as { password: string, id: string }
        console.log(userFound)
        if (!userFound) throw new AppError("Usuário inexistente!", 404)
        return userFound
    }
    getUserInfos(id: string) {
        const user = this.db.query(`SELECT * FROM user WHERE id = ?1;`).get(id)
        if (!user) throw new AppError('Usuário inexistente!')
        return user
    }
    edit() {}
    getOrders() {}
    delete() {}
    get() {}
}