import { fakerPT_BR as faker } from "@faker-js/faker";
import { generateCPF } from "./generateCPF";

export function generateAdmin(i: number) {
    return {
        // id: crypto.randomUUID(), ACTUAL USING INDEX
        name: faker.person.fullName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        store_id: i + 1,
        cpf: generateCPF(),
        salary: faker.finance.amount({ min: 4000, max: 15000, dec: 2 }),
        phone: faker.phone.number(),
        created_at: faker.date.past().toISOString(),
        active: true,
        is_manager: true,
        details: faker.lorem.sentence()
    }
}