import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpensesService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "IncomeExpenses";
  }

  getReparationsIncomes(token: string, year: number, month?: number, day?: number): Observable<any>{

    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url + `/get-reparations-income/${year}/${month ?? 0}/${day ?? 0}`, { headers: this.headers } )
  }

  getPurchasesIncomes(token: string, year: number, month?: number, day?: number): Observable<any>{

    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url + `/get-purchases-income/${year}/${month ?? 0}/${day ?? 0}`, { headers: this.headers } )
  }
}
