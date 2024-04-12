import { Repository } from "./base";
import { type User, type UserInput } from "../types/models/User";
export class UserRepository extends Repository {
    constructor() {
        super()
        this.db.run(`CREATE TABLE IF NOT EXISTS user
        (
          id       TEXT NOT NULL,
          username TEXT NOT NULL CONSTRAINT unique_username UNIQUE,
          email    TEXT NOT NULL CONSTRAINT unique_email UNIQUE,
          CPF      TEXT NOT NULL CONSTRAINT unique_cpf UNIQUE,
          CEP      TEXT NULL    ,
          password TEXT NOT NULL,
          picture  TEXT NULL    ,
          PRIMARY KEY (id)
        )`)
    }
    create({ CPF, email, password, username, id }: UserInput & { id: string }) {
        const insert = this.db.prepare("INSERT INTO user (username, email, password, CPF, id) VALUES (?1, ?2, ?3, ?4, ?5)")
        try {
            insert.run(username, email, password, CPF, id)
            return "Usuário criado com sucesso!"
        } catch(err) {
            console.log(err)
            return "Teste"
        }

    }
}