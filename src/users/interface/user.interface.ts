export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    salt: string;
    hash: string;
    balance: number;
}
