import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReparationClaimCreation } from 'src/app/models/ReparationClaims/ReparationClaimCreation';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class ReparationClaimService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "ReparationsClaims";
  }

  create(reparationClaim: ReparationClaimCreation, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(reparationClaim);
    return this._http.post(this.url + "/create", params, { headers: this.headers });
  }

  getAll(token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url, { headers: this.headers })
  }

}
