import { PurchaseArticleCreation } from "../models/PurchaseArticle/PurchaseArticleCreation";
import { UserDetail } from "../models/User/UserDetail";

export var Global = {
    url: 'https://localhost:7032/api/',
};

/**
 * Defino la interfaz para definir el monto del carrito
 */
declare global {
    interface Window {
      /************ VARIABLES GENERALES *********/

      // Url para confirmar el pago.
      apiConfirmPaymentUrl: string;

      // Estado del pago para usar en la alerta.
      pagoStatus: Function;

      // Url de redireccion exitosa luego de que se efectúa el pago.
      paymentSuccessRedirect: string;

      // Url de redireccion fallida luego de que se efectúa el pago.
      paymentFailedRedirect: string;


      /************* VARIABLES PARA LAS COMPRAS ***************/

      // Monto total del carrito.
      amount: number;
  
      // Articulos en el carrito.
      purchaseArticles: Array<PurchaseArticleCreation>;
  
      // Si la compra se paga en el local o online
      payInPerson: boolean;

      // Id de la dirección a la que irá el envio
      shipmentAddressId: number;

      // Identidad del usuario logueado.
      identity: UserDetail;


      /*************** VARIABLES PARA LAS REPARACIONES *****************/

      // Monto total de la reparación.
      reparationAmount: number;

      // Identificador de la reparacion para hacer un pago
      reparationId: number;
    }
  }