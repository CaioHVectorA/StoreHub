export const ADMIN_TABLE = `
    CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        store_id VARCHAR(255),
        cpf VARCHAR(255),
        salary INT,
        phone VARCHAR(255),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        termination_date TIMESTAMP NULL,
        active BOOLEAN,
        is_manager BOOLEAN,
        details VARCHAR(255)
    );
`;
export type Admin = {
    id: string;
    name: string;
    password: string;
    email: string;
    store_id: string;
    cpf: string;
    salary: number;
    phone: string;
    created_at: string;
    termination_date: Date | string | null;
    active: boolean;
    is_manager: boolean;
    details: string;
};