export class ReparationClaimAnswer{
    id: number;
    reparationClaimId: number;
    answer: string;
    employeeUserName: string;

    constructor(){
        this.id = 0;
        this.reparationClaimId = 0;
        this.answer = '';
        this.employeeUserName = '';
    }
}