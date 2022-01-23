import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../../utils/Global';
import { XhrFactory } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "Articles";
  }

  getArticles(): Observable<any> {
    return this._http.get(this.url,{headers: this.headers});
  }

  create(article: any, token: string): Observable<any>{
    const formData: FormData = new FormData();
      var xhr = new XMLHttpRequest();
      
      for(var key in article){
        formData.append(key, article[key]);
      }
      
      //  xhr.setRequestHeader('Authorization',token);
        xhr.open('POST', Global.url + "Articles/create", true );  
        xhr.send(formData)
        return this.getByCode(article.code)
  }

  getByCode(code: string): Observable<any>{
    return this._http.get(this.url+"/get-by-code/"+code,{headers: this.headers});
  }
}
