export type UserInput = {
    username: string;
    email: string;
    CPF: string;
    password: string;
    CEP: string;
}

export type User = {
    id: string;
    username: string;
    email: string;
    CPF: string;
    CEP: string;
    password: string;
    picture?: string;
    created_at: string | Date;
}

export type UserLoginNeeded = {
    login: string // CPF | EMAIL | username?
    password: string
}

export const USER_TABLE = (`CREATE TABLE IF NOT EXISTS users (
    id       VARCHAR(36) NOT NULL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email    VARCHAR(255) NOT NULL,
    CPF      VARCHAR(14) NOT NULL,
    CEP      VARCHAR(9) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    picture  TEXT NULL
  );`) as string