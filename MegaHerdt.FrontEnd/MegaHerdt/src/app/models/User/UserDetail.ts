export class UserDetail{
    id: string;
    email: string;
    dni: string;
    name: string;
    surname: string;
    createdDate: Date;
    lastLogin: Date;
    isActive: boolean;
    roles: Array<string>;
    constructor(id:string,email:string, dni:string, name:string,surname:string,roles: Array<string>)
    {
        this.id = id;
        this.email = email;
        this.dni = dni;
        this.name = name;
        this.surname = surname;
        this.roles = roles;
        this.createdDate = new Date();
        this.lastLogin = new Date();
        this.isActive = false;
    }
}