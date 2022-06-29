import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleUser } from 'src/app/models/Roles/RoleUser';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url: String;
  private headers =  new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private _http: HttpClient) 
  { 
    this.url = Global.url + "Roles";
  }

  /**
   * 
   * @param email 
   * @returns Role(Array)
   */
  getUserRoles(username: string, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url + "/get-user-roles/"+ username, { headers: this.headers});
  }

  removeUserRole(roleUser: RoleUser, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(roleUser);
    return this._http.post(this.url + "/remove-role-to-user", params, { headers: this.headers});
  }

  getRoles(token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url + "/get-roles", { headers: this.headers});
  }

  assignRole(roleUser:RoleUser, token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    let params = JSON.stringify(roleUser);
    return this._http.post(this.url + "/assign-role", params, { headers: this.headers});
  }
}
