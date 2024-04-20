import { faker } from "@faker-js/faker";

export function generateStore(i: number) {
    return {
        id: i + 1,
        name: faker.company.name(),
        location: faker.location.city(),
        manager_id: faker.person.firstName(),
        inventory_id: i
    }
}