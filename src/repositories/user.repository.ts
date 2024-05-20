import { Repository } from "./base";
import { promises as fs } from 'fs'
import { USER_TABLE, type User, type UserInput, type UserLoginNeeded } from "../models/user";
import { AppError } from "../middlewares/appError";
import { translateToDbFields } from "@/lib/utils/translateToDbFields";
export class UserRepository extends Repository {
    constructor() {
        super()
    }
    create({ CPF, email, password, username, id, CEP }: UserInput & { id: string }) {
        const alreadyExists = this.db.query("SELECT id from users WHERE id = ?1 OR email = ?2 OR CPF = ?3;   ").get(id, email, CPF)
        if (alreadyExists) throw new AppError('Usuário já existe no sistema!')
        const insert = this.db.prepare("INSERT INTO users (username, email, password, CPF, id, CEP) VALUES (?1, ?2, ?3, ?4, ?5, ?6);")
        insert.run(username, email, password, CPF, id, CEP)
        return "Usuário criado com sucesso!"
    }
    //todo:
    login({ login }: UserLoginNeeded) {
        const userFound = this.db.query(`SELECT password, id from users WHERE email = ?1 OR CPF = ?1;`).get(login) as { password: string, id: string }
        if (!userFound) throw new AppError("Usuário inexistente!", 404)
        return userFound
    }
    getUserInfos(id: string) {
        const user = this.db.query(`SELECT email, CPF, CEP, picture, created_at, username FROM users WHERE id = ?1;`).get(id)
        if (!user) throw new AppError('Usuário inexistente!', 404)
        return user
    }
    async edit({ id, email, username, password, picture }: { id: string, email?: string, username?: string, password?: string, picture?: string }) {
        let updateQuery = "UPDATE users SET"
        // const updateParams: any[] = [];
        // [email, username, password].forEach((param?: string) =>{ if (param) updateParams.push(param)})
        if (email) updateQuery += " email = $email,"
        if (username) updateQuery += " username = $username,"
        if (password) updateQuery += " password = $password,"
        if (picture) updateQuery += " picture = $picture," 
        updateQuery = updateQuery.slice(0, -1) + " WHERE id = $id;"
        const update = this.db.prepare(updateQuery)
        const updateParams: any = {};
        if (email) updateParams.email = email;
        if (username) updateParams.username = username;
        if (password) updateParams.password = password;
        if (picture) {
            await fs.writeFile(`${process.cwd()}/public/${id}.png`, Buffer.from(picture.toString(), 'base64'))
            updateParams.picture = `${process.cwd()}/public/${id}.png`
        }
        update.run(translateToDbFields({ ...updateParams, id }));
        return "Usuário atualizado com sucesso!"
        }
    getOrders(id: string) {
        return this.db.query("SELECT * FROM orders WHERE user_id = ?1;").all(id)
    }
    delete(id: string): boolean {
        const del = this.db.prepare("DELETE FROM users WHERE id = ?1;")
        del.run(id)
        return true
    }
    getAllUsers(limit = 10) {
        return this.db.query(`
        SELECT id, username, email, CPF, CEP, picture, created_at FROM users;
        LIMIT ?1;
        `).all(limit)
    }
}