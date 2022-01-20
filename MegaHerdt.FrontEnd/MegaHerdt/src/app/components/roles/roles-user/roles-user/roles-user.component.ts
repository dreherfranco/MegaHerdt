import { Component, Input, OnInit } from '@angular/core';
import { RoleUser } from 'src/app/models/Roles/RoleUser';
import { RoleService } from 'src/app/services/roles/role.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-roles-user',
  templateUrl: './roles-user.component.html',
  styleUrls: ['./roles-user.component.css']
})
export class RolesUserComponent implements OnInit {
  userRoles: Array<string>;
  roles: Array<string>;
  roleSelected: string;
  @Input() email: string;

  constructor(
    private _storageService: StorageService,
    private _roleService: RoleService
  ) 
    {
      this.userRoles = new Array<string>();
      this.email = "";
      this.roles = new Array<string>();
      this.roleSelected="";
     }

  ngOnInit(): void {

    setTimeout(()=>{
      this.getUserRoles();
      this.getRoles();
    },250);
    
  }
  
  getUserRoles(){
    this._roleService.getUserRoles(this.email, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se encontro el usuario");
        } else {
            this.userRoles = response; 
        }
      },
      error: (err) => {          
        console.log(err);
      }
    })
  }

  removeUserRole(roleName: string){
    let roleUser = new RoleUser(roleName,this.email);
    this._roleService.removeUserRole(roleUser, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se encontro el usuario");
        }
        else{
          console.log("rol removido correctamente");
          this.getUserRoles();
        }
      },
      error: (err) => {          
        console.log(err);
      }
    })
  }

  getRoles(){
    this._roleService.getRoles(this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se encontro el usuario");
        } else {
            this.roles = response;   
        }
      },
      error: (err) => {          
        console.log(err);
      }
    })
  }

  assignRole(){
    let roleUser = new RoleUser(this.roleSelected, this.email);
    this._roleService.assignRole(roleUser, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se encontro el usuario");
        }
        else{
          console.log("rol asignado correctamente");
          this.getUserRoles();
        }
      },
      error: (err) => {          
        console.log(err);
      }
    })
  }
}
