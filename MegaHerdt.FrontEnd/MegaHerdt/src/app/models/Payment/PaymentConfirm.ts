export class PaymentConfirm {
    installments: number;
    reparationId: number;
    stripeToken: string;
    constructor(installments: number, reparationId: number, stripeToken: string) {
        this.installments = installments;
        this.reparationId = reparationId;
        this.stripeToken = stripeToken;
    }
}