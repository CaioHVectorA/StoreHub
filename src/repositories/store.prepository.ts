import type { Store } from "@/models/store";
import { Repository } from "./base";

export class StoreRepository extends Repository {
    constructor() {
        super();
    }
    async create({ inventory_id, location, manager_id, name }: Omit<Store, 'id'>){
        this.db.prepare(`INSERT INTO stores (name, location, manager_id, inventory_id) VALUES (?, ?, ?, ?)`)
            .run(name, location, manager_id, inventory_id);
        return this.db.prepare(`SELECT last_insert_rowid() as id`).get()
    }
    async get(id: number) {
        return this.db.prepare(`
        SELECT A.name as admin_name, A.email as admin_email, A.cpf as admin_cpf, S.id, S.name 
        FROM stores S 
        INNER JOIN admins A ON S.manager_id = A.id
        WHERE S.id = ?
        `).get(id)
    }
}