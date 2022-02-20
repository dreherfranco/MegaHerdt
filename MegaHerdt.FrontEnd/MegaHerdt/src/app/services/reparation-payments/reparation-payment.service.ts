import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReparationPaymentConfirm } from 'src/app/models/Payment/ReparationPaymentConfirm';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class ReparationPaymentService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "ReparationPayments";
  }

  confirmPayment(paymentConfirm: ReparationPaymentConfirm , token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(paymentConfirm);
    return this._http.post(this.url + "/confirm-payment", params, { headers: this.headers });
  }

  checkout(stripeToken: string): Observable<any> {
    var params = JSON.stringify(stripeToken);
    // Check the server.js tab to see an example implementation
    return this._http.post(this.url + "/checkout", params, { headers: this.headers });
  }
}
