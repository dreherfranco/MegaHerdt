export class ReparationClaimAnswerCreation{
    reparationClaimId: number;
    answer: string;
    employeeUserName: string;

    constructor(reparationClaimId: number, answer: string, employeeUserName: string){
        this.reparationClaimId = reparationClaimId;
        this.answer = answer;
        this.employeeUserName = employeeUserName;
    }
}