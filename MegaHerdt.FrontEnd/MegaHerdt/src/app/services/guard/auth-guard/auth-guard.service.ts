import { Injectable } from '@angular/core';
import { StorageService } from '../../storage/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _storageService: StorageService, private router: Router) { }

  canActivate(): boolean {
    if (!this._storageService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
