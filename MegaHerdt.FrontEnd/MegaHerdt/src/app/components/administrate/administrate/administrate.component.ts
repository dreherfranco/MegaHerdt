import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { RoleEnum as Role} from 'src/app/utils/RoleEnum';

@Component({
  selector: 'app-administrate',
  templateUrl: './administrate.component.html',
  styleUrls: ['./administrate.component.css']
})
export class AdministrateComponent implements OnInit {

  constructor(private _storageService:StorageService) { }

  ngOnInit(): void {
  }
  
  isAdmin(): boolean{
    let expectedsRoles = new Array<string>();
    expectedsRoles.push(Role.ADMIN);
    return this._storageService.areExpectedRoles(expectedsRoles);
  }

  isEmployeeOrAdmin(): boolean{
    let expectedsRoles = new Array<string>();
    expectedsRoles.push(Role.ADMIN, Role.EMPLEADO);
    return this._storageService.areExpectedRoles(expectedsRoles);
  }

}
