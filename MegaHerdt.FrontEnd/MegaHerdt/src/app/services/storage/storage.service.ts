import { UserToken } from 'src/app/models/UserToken/UserToken'; 
import { Injectable } from '@angular/core';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private identity: UserDetail;
  private token: UserToken;

  constructor() 
  { 
    this.identity = new UserDetail('','','','','','', new Array<string>());
    this.token = new UserToken('',new Date());
  }

  /**
   * 
   * @returns UserDetail
   */
  getIdentity(): any{
    let identity = localStorage.getItem('identity');
    
    if(identity && identity != 'undefined')
      this.identity = JSON.parse(identity); 
    else
      console.log("la identidad de usuario no existe");
    return this.identity;
  }
  
  setIdentity(response: any): void{
      this.identity = cloneDeep(response.user);
      this.identity.roles = response.roles;
      localStorage.setItem('identity', JSON.stringify(this.identity));
  }

  /**
   * 
   * @returns UserToken
   */
  getToken(): any{
    let token = localStorage.getItem('token');
    if(token){
      this.token = cloneDeep(JSON.parse(token));
      return this.token;
    }
  }

  getTokenValue(): any{
    let token = localStorage.getItem('token');
    if(token){
      this.token = cloneDeep(JSON.parse(token));
      return this.token.token;
    }
  }

  setToken(token: any): void{
    this.token = cloneDeep(token);
    this.token.token = "Bearer " + this.token.token;
    localStorage.setItem('token', JSON.stringify(this.token));
  }

  isAuthenticated():boolean{
    let identity = localStorage.getItem('identity');
    var dateNow = new Date();
    this.token = cloneDeep(this.getToken());

    if(identity != null /*&& dateNow < this.token.expiration*/)
      return true;
    else
      return false;
  }

  logout(): void{
    localStorage.removeItem('identity');
    localStorage.removeItem('token')
  }
}
