export class AddressUpdate{
    constructor(public id: number, public streetName:string, public streetNumber: number, public department: string, 
        public  postalCode: number, public province:string, public townName:string, public floor: string){

    }
}