import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchasePaymentConfirm } from 'src/app/models/Payment/PurchasePaymentConfirm';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class PurchasePaymentService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "PurchasePayments";
  }

  confirmPayment(paymentConfirm: PurchasePaymentConfirm , token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(paymentConfirm);
    return this._http.post(this.url + "/confirm-payment", params, { headers: this.headers });
  }
}
