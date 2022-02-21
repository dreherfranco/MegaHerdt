import { AddressUpdate } from '../Address/AddressUpdate';

export class UserAddresses{
    addresses: Array<AddressUpdate>;
    constructor(addresses: Array<AddressUpdate>){
        this.addresses = addresses;
    }
}