import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseClaimCreation } from 'src/app/models/PurchaseClaim/PurchaseClaimCreation';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class PurchaseClaimService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "PurchasesClaims";
  }

  create(purchaseClaim: PurchaseClaimCreation, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(purchaseClaim);
    return this._http.post(this.url + "/create", params, { headers: this.headers });
  }

  getByClientId(clientId: string, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url + "/getByClientId/" + clientId, { headers: this.headers })
  }
}
