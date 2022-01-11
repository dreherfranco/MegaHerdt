import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { StorageService } from '../../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(public _storageService: StorageService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedsRoles = route.data['expectedsRoles'];

    if ( !(this._storageService.areExpectedRoles(expectedsRoles)) ) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
