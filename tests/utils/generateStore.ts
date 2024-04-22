import { faker } from "@faker-js/faker";

export function generateStore(i: number) {
    return {
        name: faker.company.name(),
        location: faker.location.city(),
        manager_id: i + 1,
        inventory_id: i + 1,
    }
}