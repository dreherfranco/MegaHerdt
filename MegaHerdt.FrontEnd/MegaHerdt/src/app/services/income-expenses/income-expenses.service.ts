import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getReparationsIncomesRange(token: string, startDate?: Date, endDate?: Date): Observable<any> {
    this.headers = this.headers.set('Authorization', token);
    // const params = new HttpParams()
    //   .set('startDate', startDate ? startDate.toISOString() : '')
    //   .set('endDate', endDate ? endDate.toISOString() : '');
    return this._http.get(this.url + `/get-reparations-income/${startDate ? startDate.toISOString() : ''}/${endDate ? endDate.toISOString() : ''}`, { headers: this.headers/*, params*/ });
  }
  
  getPurchasesIncomesRange(token: string, startDate?: Date, endDate?: Date): Observable<any>
  {
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url + `/get-purchases-income/${startDate ? startDate.toISOString() : ''}/${endDate ? endDate.toISOString() : ''}`, { headers: this.headers } )
  }
}
