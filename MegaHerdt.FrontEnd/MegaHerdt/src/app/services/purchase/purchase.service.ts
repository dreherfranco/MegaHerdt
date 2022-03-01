import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
