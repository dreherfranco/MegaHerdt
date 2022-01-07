import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../../utils/Global';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public url: String;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "Articles";
  }

  getArticles(): Observable<any> {
    return this._http.get(this.url.toString(),{headers: this.headers});
  }
}
