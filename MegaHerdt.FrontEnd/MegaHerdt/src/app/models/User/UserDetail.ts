export class UserDetail{
    id: string;
    email: string;
    dni: string;
    name: string;
    surname: string;
    roles: Array<string>;
    constructor(id:string,email:string, dni:string, name:string,surname:string,roles: Array<string>)
    {
        this.id = id;
        this.email = email;
        this.dni = dni;
        this.name = name;
        this.surname = surname;
        this.roles = roles;
    }
}