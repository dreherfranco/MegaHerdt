export class TokenDecoded{
    email:string;
    id:string;
    role:Array<string>;
    name:string;
    constructor(email:string, id:string, role:Array<string>, name:string){
        this.email=email;
        this.id=id;
        this.role=role;
        this.name=name;
    }
}