import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Article } from '../../models/Article/Article';
import { Global } from '../../utils/Global';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public url: String;

  constructor(private _http: HttpClient) {
    this.url = Global.url + "Articles";
   }

  getArticles(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url.toString(), {headers: headers});
  }
}
