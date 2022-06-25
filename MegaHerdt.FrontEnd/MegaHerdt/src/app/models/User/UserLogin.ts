export class UserLogin{
    email: string;
    password: string;
    userName: string;

    constructor(email: string, password: string){
        this.userName = '';
        this.email = email;
        this.password = password;
    }
}