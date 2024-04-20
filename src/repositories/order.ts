import type { Order } from "@/models/order";
import { Repository } from "./base";

export class OrderRepository extends Repository {
    cancel() {}
    edit() {}
    checkout({ id, productsIDs, status, store_id, user_id }: Omit<Order, 'created_at'> & { productsIDs: string[] }) {
        const insert = this.db.prepare("INSERT INTO orders (id, status, store_id, user_id, created_at) VALUES (?1, ?2, ?3, ?4, ?5);")
        insert.run(id, status, store_id, user_id) 
    }
}