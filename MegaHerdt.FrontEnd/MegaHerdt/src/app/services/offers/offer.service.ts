import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleOffer } from 'src/app/models/ArticleOffer/ArticleOffer';
import { ArticleOfferCreation } from 'src/app/models/ArticleOffer/ArticleOfferCreation';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "ArticlesOffers";
  }

  create(offer: ArticleOfferCreation, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(offer);
    return this._http.post(this.url + "/create", params, { headers: this.headers } )
  }

  /**
   * 
   * @param token string 
   * @returns Array: ArticleOffer
   */
  getAll(token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url, { headers: this.headers } )
  }

  update(offer: ArticleOffer, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(offer);
    return this._http.post(this.url + "/update", params, { headers: this.headers });
  }

  delete(id: number, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.delete(this.url + "/" + id, { headers: this.headers });
  }
}
