import { PhoneCreation } from '../Phone/PhoneCreation';
import { AddressCreation } from '../Address/AddressCreation';

export class UserCreate{
    email: string;
    dni: string;
    name: string;
    surname: string;
    phones: Array<PhoneCreation>;
    addresses: Array<AddressCreation>;

    constructor(email:string, dni:string, name:string,surname:string,phones: Array<PhoneCreation>,
         addresses: Array<AddressCreation>) 
    {
        this.email= email;
        this.dni = dni;
        this.name=name;
        this.surname=surname;
        this.phones=phones;
        this.addresses=addresses;
    }
}