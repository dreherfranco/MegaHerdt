export class PurchaseClaimAnswerCreation{
    purchaseClaimId: number;
    answer: string;
    employeeUserName: string;
    constructor(purchaseClaimId: number, answer: string, employeeUserName: string){
        this.purchaseClaimId = purchaseClaimId;
        this.answer = answer;
        this.employeeUserName = employeeUserName;
    }
}