import { UserToken } from 'src/app/models/UserToken/UserToken'; 
import { Injectable } from '@angular/core';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { cloneDeep } from 'lodash';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private identity: UserDetail;
  private tokenCreds: UserToken;

  constructor() 
  { 
    this.identity = new UserDetail('','','','','', new Array<string>());
    this.tokenCreds = new UserToken('',new Date());
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
  getTokenCredentials(): any{
    let token = localStorage.getItem('token');
    if(token){
      this.tokenCreds = cloneDeep(JSON.parse(token));
      return this.tokenCreds;
    }
  }

  getTokenValue(): any{
    let token = localStorage.getItem('token');
    if(token){
      this.tokenCreds = cloneDeep(JSON.parse(token));
      return this.tokenCreds.token;
    }
  }

  setTokenCredentials(token: any): void{
    this.tokenCreds = cloneDeep(token);
    this.tokenCreds.token = "Bearer " + this.tokenCreds.token;
    localStorage.setItem('token', JSON.stringify(this.tokenCreds));
  }

  isAuthenticated(): boolean{
    let identity = localStorage.getItem('identity');
   
    if(identity != null && !this.isTokenExpired())
      return true;
    else
      return false;
  }

  isTokenExpired(): boolean{
    var dateNow = new Date();
    this.tokenCreds = cloneDeep(this.getTokenCredentials());
    var dateTokenExpiration = new Date(this.tokenCreds.expiration);
    if(dateNow > dateTokenExpiration){
      return true;
    }
    return false;
  }

  logout(): void{
    localStorage.removeItem('identity');
    localStorage.removeItem('token')
  }

  areExpectedRoles(expectedsRoles: Array<string>): boolean{
    this.identity = this.getIdentity();
    var areExpecteds = false;

    this.identity.roles.forEach(role => {
      expectedsRoles.forEach(expectedRole => {
        if(role == expectedRole)
        { 
          areExpecteds=true;
        }
      });
    });

    return areExpecteds;
  }

}
