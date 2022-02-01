import { Reparation } from "../Reparation/Reparation";

export class ReparationClaim{
    id: number;
    description: string;
    date: Date;
    answered: boolean;
    reparation: Reparation;
    constructor(id: number, description: string, date: Date, answered: boolean, reparation: Reparation){
        this.id = id;
        this.description = description;
        this.date = date;
        this.answered = answered;
        this.reparation = reparation;
    }
}