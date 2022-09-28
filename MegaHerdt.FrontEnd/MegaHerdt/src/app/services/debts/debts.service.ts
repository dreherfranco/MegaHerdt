import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class DebtsService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "Debtors";
  }

  getAllDebtors(): Observable<any>{
    return this._http.get(this.url + "/get-all", { headers: this.headers });
  }
}
