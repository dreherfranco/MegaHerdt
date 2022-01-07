import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../../utils/Global';
import { UserCreate } from 'src/app/models/User/UserCreate';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: String;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "Users";
  }

  register(user: UserCreate): Observable<any>{
    let params = JSON.stringify(user);
    return this._http.post(this.url + "/create", params, {headers: this.headers});
  }
}
