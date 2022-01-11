import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../../utils/Global';
import { UserCreate } from 'src/app/models/User/UserCreate';
import { UserLogin } from 'src/app/models/User/UserLogin';
import { UserUpdate } from 'src/app/models/User/UserUpdate';
import { UserToken } from 'src/app/models/UserToken/UserToken';

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

  getByEmail(email: string): Observable<any>{
    return this._http.get(this.url+"/get-user/"+email,  {headers: this.headers} );
  }

  update(user: UserUpdate, token: string): Observable<any>{
    let params = JSON.stringify(user);
    this.headers = this.headers.set('Authorization', token);
    return this._http.post(this.url+"/update", params, {headers: this.headers} );
  }

}
