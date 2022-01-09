import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  getIdentity(){
    let identity = localStorage.getItem('identity');
    
    if(identity && identity != 'undefined')
      identity = JSON.parse(identity); 
    else
      identity = null;
    return identity;
  }
  
  getToken(): any{
    let token = localStorage.getItem('token');
    if(token){
      return token;
    }
    else{
      console.log("no existe el token");
    }
  }

  isAuthenticated():boolean{
    let identity = localStorage.getItem('identity');
    if(identity != null)
      return true;
    else
      return false;
  }

}
