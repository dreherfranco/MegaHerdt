import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReparationClaimAnswerCreation } from 'src/app/models/ReparationClaims/ReparationClaimAnswerCreation';
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

  /**
   * 
   * @param token 
   * @returns Array: ReparationClaim
   */
  getAll(token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url, { headers: this.headers })
  }

  /**
   * 
   * @param clientId 
   * @param token 
   * @returns Array: ReparationClaim
   */
  getByClientId(clientId: string, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url + "/getByClientId/" + clientId, { headers: this.headers })
  }

  answerClaim(answer: ReparationClaimAnswerCreation,token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(answer);
    return this._http.post(this.url + "/answer", params, { headers: this.headers });
  }

  getAnswersByClaimId(claimId: number, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url + "/get-claim-answers/" + claimId, { headers: this.headers })
  }
}
