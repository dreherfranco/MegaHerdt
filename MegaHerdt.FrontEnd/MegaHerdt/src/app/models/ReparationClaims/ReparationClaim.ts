import { ReparationDetail } from "../Reparation/ReparationDetail";

export class ReparationClaim{
    id: number;
    description: string;
    date: Date;
    reparation: ReparationDetail;
    constructor(id: number, description: string, date: Date, reparation: ReparationDetail){
        this.id = id;
        this.description = description;
        this.date = date;
        this.reparation = reparation;
    }
}