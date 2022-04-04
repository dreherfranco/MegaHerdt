import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { StorageService } from 'src/app/services/storage/storage.service';
import { RoleEnum as Role} from 'src/app/utils/RoleEnum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userAuthenticated: UserDetail = new UserDetail('','','','','',[]);

  constructor(private _storageService: StorageService) { 
  }

  ngOnInit(): void {
    this.userAuthenticated = this._storageService.getIdentity();
  }

  authenticated(): boolean{
    return this._storageService.isAuthenticated();
  }

  isEmployeeOrAdmin(): boolean{
    let expectedsRoles = new Array<string>();
    expectedsRoles.push(Role.ADMIN, Role.EMPLEADO);
    return this._storageService.areExpectedRoles(expectedsRoles);
  }
}
