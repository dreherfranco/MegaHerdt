import { ReparationDetail } from "../Reparation/ReparationDetail";

export class ReparationClaim{
    id: number;
    description: string;
    date: Date;
    answered: boolean;
    reparation: ReparationDetail;
    constructor(id: number, description: string, date: Date, answered: boolean, reparation: ReparationDetail){
        this.id = id;
        this.description = description;
        this.date = date;
        this.answered = answered;
        this.reparation = reparation;
    }
}