import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from 'src/app/models/Provider/Provider';
import { ProviderCreation } from 'src/app/models/Provider/ProviderCreation';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = Global.url + 'Providers';
  }

  create(provider: ProviderCreation, token: string): Observable<any> {
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(provider);
    return this._http.post(this.url + '/create', params, {
      headers: this.headers,
    });
  }

  getAll(token: string): Observable<any> {
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url, { headers: this.headers });
  }

  getAllEnableds(token: string): Observable<any> {
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url + '/get-enableds', {
      headers: this.headers,
    });
  }

  update(provider: Provider, token: string): Observable<any> {
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(provider);
    return this._http.post(this.url + '/update', params, {
      headers: this.headers,
    });
  }

  delete(id: number, token: string): Observable<any> {
    this.headers = this.headers.set('Authorization', token);
    return this._http.delete(this.url + '/' + id, { headers: this.headers });
  }
}
