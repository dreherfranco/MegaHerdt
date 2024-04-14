import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from 'src/app/models/Purchase/Purchase';
import { Shipment } from 'src/app/models/Shipment/Shipment';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "Purchases";
  }

  getClientPurchases(clientId: string, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url + "/clientPurchases/" + clientId, { headers: this.headers });
  }

  getAll(token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url, { headers: this.headers });
  }

  /**
   * Filtrar por PurchaseState.
   * Obtiene todas las compras de todos los usuarios (solo visible para empleado y admin)
   */
  getByState(state: number, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url+ "/get-by-state/" + state, { headers: this.headers });
  }

  getPurchaseById(purchaseId: number, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url + "/" + purchaseId, { headers: this.headers });
  }

  assignShipment(shipment: Shipment, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(shipment);
    return this._http.post(this.url + "/shipment/update", params , { headers: this.headers });
  }

  fromReservedToPaid(purchase: Purchase, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(purchase);
    return this._http.post(this.url + "/from-reserved-to-paid", params, { headers: this.headers });
  }

  fromPaidToDelivered(purchase: Purchase, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(purchase);
    return this._http.post(this.url + "/from-paid-to-delivered", params, { headers: this.headers });
  }
}
