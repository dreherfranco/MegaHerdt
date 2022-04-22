import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../../utils/Global';
import { ArticlePriceUpdateByCategory } from 'src/app/models/Article/ArticlePriceUpdateByCategory';

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

  sendFormData(article: any, urlAction:string): Observable<any>{
    const formData: FormData = new FormData();
      var xhr = new XMLHttpRequest();
      
      for(var key in article){
        formData.append(key, article[key]);
      }
      
      //  xhr.setRequestHeader('Authorization',token);
        xhr.open('POST', Global.url + "Articles/"+ urlAction, true );  
        xhr.send(formData);
        
        return this.getByName(article.name);
  }

  getByName(name: string): Observable<any>{
    return this._http.get(this.url+"/get-by-name/"+name,{headers: this.headers});
  }

  /**
   * 
   * @returns Array: ArticleName
   */
  getArticleNames(): Observable<any>{
    return this._http.get(this.url+"/get-article-names",{headers: this.headers});
  }

  updatePriceByCategory(articlePriceUpdate: ArticlePriceUpdateByCategory): Observable<any>{
    let params = JSON.stringify(articlePriceUpdate);
    return this._http.post(this.url + "/update-price-by-category",params, {headers: this.headers})
  }

  delete(id: number, token:string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.delete(this.url + "/" + id, { headers: this.headers });
  }
}
