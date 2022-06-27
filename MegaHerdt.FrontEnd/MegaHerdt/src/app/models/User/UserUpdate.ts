import { PhoneUpdate } from '../Phone/PhoneUpdate';
import { AddressUpdate } from '../Address/AddressUpdate';

export class UserUpdate{
    email: string;
    password: string;
    dni: string;
    name: string;
    surname: string;
    phones: Array<PhoneUpdate>;
    addresses: Array<AddressUpdate>;
    userName: string;

    constructor(email:string, password: string, dni:string, name:string,surname:string,phones: Array<PhoneUpdate>,
         addresses: Array<AddressUpdate>) 
    {
        this.email= email;
        this.password = password;
        this.dni = dni;
        this.name = name;
        this.surname = surname;
        this.phones = phones;
        this.addresses = addresses;
        this.userName = "";
    }
}