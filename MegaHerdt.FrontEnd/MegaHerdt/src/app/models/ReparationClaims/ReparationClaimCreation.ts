export class ReparationClaimCreation{
    clientId: string;
    reparationId: number;
    description: string;
    date: Date;
    constructor(clientId: string, reparationId: number, description: string, date: Date){
        this.clientId = clientId;
        this.reparationId = reparationId;
        this.description = description;
        this.date = date;
    }
}