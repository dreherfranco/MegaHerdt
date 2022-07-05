import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReparationCreation } from 'src/app/models/Reparation/ReparationCreation';
import { ReparationUpdate } from 'src/app/models/Reparation/ReparationUpdate';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "Reparations";
  }

  create(reparation: ReparationCreation, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(reparation);
    return this._http.post(this.url + "/create", params, { headers: this.headers });
  }

  update(reparation: ReparationUpdate, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(reparation);
    return this._http.post(this.url + "/update", params, { headers: this.headers });
  }
  
  getAll(token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url+"/get-all", { headers: this.headers });
  }

  getById(id:number, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url+ "/" + id, { headers: this.headers });
  }

  getByStateId(stateId:number, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url+ "/get-by-state-id/" + stateId, { headers: this.headers });
  }

  delete(reparationId: number, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.delete(this.url + "/delete/" + reparationId, { headers: this.headers });
  }

  getClientReparations(clientId: string, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url + "/clientReparations/" + clientId, { headers: this.headers });
  }
}
