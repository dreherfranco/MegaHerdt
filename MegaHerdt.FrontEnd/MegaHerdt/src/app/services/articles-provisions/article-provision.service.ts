import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArticleProvider } from 'src/app/models/ArticleProvider/ArticleProvider';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class ArticleProvisionService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');
  public articlesProviders = new BehaviorSubject<Array<ArticleProvider>>([]);

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "ArticlesProviders";
    this.updateArticleProviders();
  }

  updateArticleProviders(){
    this.getAll().subscribe({
      next: res => this.articlesProviders.next(res)
    })
  }

  sendFormData(articleProvider: any, urlAction:string){
    const formData: FormData = new FormData();
      var xhr = new XMLHttpRequest();
      
      for(var key in articleProvider){
        formData.append(key, articleProvider[key]);
      }
      
      //  xhr.setRequestHeader('Authorization',token);
        xhr.open('POST', Global.url + "ArticlesProviders/"+ urlAction, true );  
        xhr.send(formData);
  }
  
  create(articleProvider: any, token:string): Observable<any>
  {
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(articleProvider);
    return this._http.post(this.url+"/create", params, { headers: this.headers });
  
  }

  update(article: any, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(article);
    return this._http.post(this.url+"/update", params, { headers: this.headers });
  }

  getAll(): Observable<any>{
    return this._http.get(this.url, { headers: this.headers });
  }

  getAllDiscounted(): Observable<any>{
    return this._http.get(this.url+"/get-all-discounted", { headers: this.headers });
  }

  delete(id: number, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.delete(this.url + "/"+ id, { headers: this.headers });
  }
}
