import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Brand } from 'src/app/models/ArticleBrand/Brand';
import { BrandCreation } from 'src/app/models/ArticleBrand/BrandCreation';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');
  public brands = new BehaviorSubject<Array<Brand>>([]);

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "ArticlesBrands";
    this.updateBrands();
  }

  create(category: BrandCreation, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(category);
    return this._http.post(this.url + "/create", params, { headers: this.headers });
  }

  updateBrands(){
    this.getAll().subscribe({
      next: res => this.brands.next(res)
    })
  }
  /**
   * 
   * @returns Array: Category 
   */
  getAll(): Observable<any>{
    return this._http.get(this.url, { headers: this.headers });
  }

  getStatistics(token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url + '/statistics', { headers: this.headers });
  }
  
  update(category: Brand, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(category);
    return this._http.post(this.url + "/update", params, { headers: this.headers });
  }

  delete(id: number, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.delete(this.url + "/" + id, { headers: this.headers });
  }
}
