import { PhoneCreation } from '../Phone/PhoneCreation';
import { AddressCreation } from '../Address/AddressCreation';

export class UserCreate{
    email: string;
    password: string;
    dni: string;
    name: string;
    surname: string;
    phones: Array<PhoneCreation>;
    addresses: Array<AddressCreation>;

    constructor(email:string, password: string, dni:string, name:string,surname:string,phones: Array<PhoneCreation>,
         addresses: Array<AddressCreation>) 
    {
        this.email= email;
        this.password = password;
        this.dni = dni;
        this.name=name;
        this.surname=surname;
        this.phones=phones;
        this.addresses=addresses;
    }
}