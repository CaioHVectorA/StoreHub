import type { Store, StoreInput } from "@/models/store";
import { Repository } from "./base";
import { AppError } from "@/middlewares/appError";

export class StoreRepository extends Repository {
    constructor() {
        super();
    }
    async create({ inventory_id, location, manager_id, name }: StoreInput){
        try {
            this.db.prepare(`INSERT INTO stores (name, location, manager_id, inventory_id) VALUES (?, ?, ?, ?)`).run(name, location, manager_id, inventory_id);        
        } catch (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                throw new AppError('Loja já existe', 409)
            }
            throw err
        }
        return this.db.prepare(`SELECT last_insert_rowid() as id`).get()
    }
    async get(id: number) {
        const query = (`SELECT
        A.name as manager_name, A.email as manager_email, A.cpf as manager_cpf,
        S.name, S.location as store_location, S.active_status as store_status, S.created_at as store_created_at
        FROM stores 
        S LEFT JOIN admins A 
        ON S.manager_id = A.id
        WHERE S.id = ?1`)
        const store = this.db.prepare(query).get(id)
        if (!store) throw new AppError('Loja não encontrada', 404)
        return store
    }
    async changeManager(store_id: number, manager_id: string) {
        this.db.prepare(`UPDATE stores SET manager_id = ?1 WHERE id = ?2`)
            .run(manager_id, store_id)
    }
    async disable(id: number) {
        this.db.prepare(`UPDATE stores SET active_status = 'disabled', disabled_at = CURRENT_TIMESTAMP WHERE id = ?1`)
            .run(id)
    }
    async close(id: number) {
        this.db.prepare(`UPDATE stores SET is_open = 0 WHERE id = ?1`)
            .run(id)
    }
    async getProducts(id: number) {
        const query = (`SELECT
        P.id, P.title, P.description, P.barcode, P.brand, P.images, P.price, P.category_id, P.created_at, P.updated_at
        FROM stores S INNER JOIN products P ON S.inventory_id = P.inventory_id WHERE S.id = ?1`)
        return this.db.prepare(query).all(id)
    }
}