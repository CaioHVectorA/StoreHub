import type { Store, StoreInput } from "@/models/store";
import { StoreRepository } from "@/repositories/store.repository";

export class StoreService {
    private repo = new StoreRepository(); 
    async create({ inventory_id, location, manager_id, name }: StoreInput) {
        const response = await this.repo.create({ inventory_id, location, manager_id, name });
        return response
    }
    async get(id: number) {
        const response = await this.repo.get(id);
        return response
    }
    async changeManager(store_id: number, manager_id: string) {
        const response = await this.repo.changeManager(store_id, manager_id);
        return response
    }
    async disable(id: number) {
        const response = await this.repo.disable(id);
        return response
    }
    async close(id: number) {
        const response = await this.repo.close(id);
        return response
    }
    async getProducts(id: number) {
        const response = await this.repo.getProducts(id);
        return response
    }
}