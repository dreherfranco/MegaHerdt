import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../../utils/Global';
import { UserCreate } from 'src/app/models/User/UserCreate';
import { UserLogin } from 'src/app/models/User/UserLogin';
import { UserUpdate } from 'src/app/models/User/UserUpdate';
import { UserChangePassword } from 'src/app/models/User/UserChangePassword';

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
    return this._http.post(this.url+"/update", params, { headers: this.headers } );
  }

  delete(userEmail: string, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.delete(this.url+"/delete/"+ userEmail, { headers: this.headers } );
  }

  getUsers(token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url + "/get-users", { headers: this.headers });
  }

  changePassword(user: UserChangePassword,token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(user);
    return this._http.post(this.url + "/change-password", params, { headers: this.headers });
  }
}

