export class Provider{
    id: number;
    name: string;
    phone: string;
    email: string;
    constructor(id: number, name: string, phone: string, email: string){
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}