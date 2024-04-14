import { isNull } from "lodash";
import { Bill } from "../Bill/Bill";
import { PurchaseArticle } from "../PurchaseArticle/PurchaseArticle";
import { PurchaseClaimDetail } from "../PurchaseClaim/PurchaseClaimDetail";
import { Shipment } from "../Shipment/Shipment";
import { UserDetail } from "../User/UserDetail";

export enum PurchaseState {
    Reserved = 0,
    CancelledReservation = 1,
    Paid = 2,
    Delivered = 3
  }
  
export class Purchase{
    id: number;
    date: Date;
    client: UserDetail;
    shipment: Shipment;
    payInPerson: Boolean;
    state: PurchaseState;
    bill: Bill;
    paymentsQuantity: number | null = null;
    purchasesArticles: Array<PurchaseArticle>;
    purchasesClaims: Array<PurchaseClaimDetail>;

    constructor()
    {
        this.id = 0;
        this.date = new Date;
        this.client = new UserDetail('','','','','',[]);
        this.shipment = new Shipment();
        this.payInPerson = false;
        this.state = PurchaseState.Reserved;
        this.purchasesArticles = [];
        this.purchasesClaims = [];
        this.bill = new Bill();
    }

    static getPurchaseStateName(state: number): string {
        let resultState: PurchaseState;
        
        // Verifica si el estado pasado como argumento es válido
        if (state in PurchaseState) {
            resultState = state;
        } else {
            return "Estado Desconocido";
        }
    
        // Usa un switch para obtener el nombre del estado en español
        switch(resultState){
          case PurchaseState.Reserved:
            return "Reservado";
          case PurchaseState.CancelledReservation:
            return "Reserva Cancelada";
          case PurchaseState.Paid:
            return "Pagado";
          case PurchaseState.Delivered:
            return "Entregado";
          default:
            return "Estado Desconocido";
        }
    }
}