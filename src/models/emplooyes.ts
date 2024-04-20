export type Emplooyes = {
    id: string;
    name: string;
    password: string;
    email: string;
    store_id: string;
    cpf: string;
    salary: number;
    phone: string;
    created_at: string;
    termination_date?: string;
    active: boolean;
    details: string;
};

export const EMPLOOYES_TABLE = `CREATE TABLE IF NOT EXISTS emplooyes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    storeId VARCHAR(255),
    cpf VARCHAR(255),
    salary INT,
    phone VARCHAR(255),
    createdAt VARCHAR(255),
    terminationDate VARCHAR(255),
    active BOOLEAN,
    details VARCHAR(255),
    store JSONB
);
`;