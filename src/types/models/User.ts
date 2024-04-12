export type UserInput = {
    username: string;
    email: string;
    CPF: string;
    password: string;
}

export type User = {
    id: string;
    username: string;
    email: string;
    CPF: string;
    CEP?: string;
    password: string;
    picture?: string;
}
