export class PurchaseClaimAnswer{
    id: number;
    purchaseClaimId: number;
    answer: string;
    employeeUserName: string;

    constructor(){
        this.id = 0;
        this.purchaseClaimId = 0;
        this.answer = '';
        this.employeeUserName = '';
    }
}