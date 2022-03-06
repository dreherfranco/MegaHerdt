import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransportCompany } from 'src/app/models/TransportCompany/TransportCompany';
import { TransportCompanyCreation } from 'src/app/models/TransportCompany/TransportCompanyCreation';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class TransportCompanyService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "TransportCompanies";
  }

  create(category: TransportCompanyCreation, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(category);
    return this._http.post(this.url + "/create", params, { headers: this.headers });
  }

  /**
   * 
   * @returns Array: Category 
   */
  getAll(): Observable<any>{
    return this._http.get(this.url, { headers: this.headers });
  }

  update(category: TransportCompany, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(category);
    return this._http.post(this.url + "/update", params, { headers: this.headers });
  }

  delete(id: number, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.delete(this.url + "/" + id, { headers: this.headers });
  }
}
