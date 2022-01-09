import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../../utils/Global';
import { UserCreate } from 'src/app/models/User/UserCreate';
import { UserLogin } from 'src/app/models/User/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: String;
  private headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "Users";
  }

  register(user: UserCreate): Observable<any>{
    let params = JSON.stringify(user);
    return this._http.post(this.url + "/create", params, {headers: this.headers});
  }

  login(user: UserLogin): Observable<any>{
    let params = JSON.stringify(user);
    return this._http.post(this.url + "/login", params, {headers: this.headers});
  }
}
