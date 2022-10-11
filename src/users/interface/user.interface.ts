export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    salt: string;
    hash: string;
    balance: number;
}
