import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReparationState } from 'src/app/models/ReparationState/ReparationState';
import { ReparationStateCreation } from 'src/app/models/ReparationState/ReparationStateCreation';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class ReparationStateService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "ReparationsStates";
  }

  create(reparationState: ReparationStateCreation, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(reparationState);
    return this._http.post(this.url + "/create", params, { headers: this.headers });
  }

  /**
   * 
   * @returns Array: ReparationState 
   */
  getAll(): Observable<any>{
    return this._http.get(this.url, { headers: this.headers });
  }

  update(reparationState: ReparationState, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(reparationState);
    return this._http.post(this.url + "/update", params, { headers: this.headers });
  }

  delete(id: number, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.delete(this.url + "/" + id, { headers: this.headers });
  }
}
