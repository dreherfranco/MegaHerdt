export class ReparationClaimDetail {
    id: number;
    description: string;
    date: Date;
    answered: boolean;

    constructor(id: number, description: string, date: Date, answered: boolean){
        this.id = id;
        this.description = description;
        this.date = date;
        this.answered = answered;
    }
}