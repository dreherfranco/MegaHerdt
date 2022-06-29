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
  @Input() username: string;
  statusAssignRole: string = '';
  statusRemoveRole: string = '';

  constructor(
    private _storageService: StorageService,
    private _roleService: RoleService
  ) {
    this.userRoles = new Array<string>();
    this.username = "";
    this.roles = new Array<string>();
    this.roleSelected = "";
  }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getUserRoles() {
    this._roleService.getUserRoles(this.username, this._storageService.getTokenValue()).subscribe({
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

  removeUserRole(roleName: string) {
    let roleUser = new RoleUser(roleName, this.username);
    this._roleService.removeUserRole(roleUser, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se encontro el usuario");
          this.statusRemoveRole = 'failed';
        }
        else {
          console.log("rol removido correctamente");
          this.statusRemoveRole = 'success';
          this.getAllRoles();
        }
      },
      error: (err) => {
        this.statusRemoveRole = 'failed';
        console.log(err);
      }
    })
  }

  updateRoles() {
    for (let i = 0; i < this.userRoles.length; i++) {
      for (let j = 0; j < this.roles.length; j++) {
        if (this.userRoles[i] === this.roles[j]) {
          this.roles.splice(j, 1);
        }
      }
    }
  }

  getRoles() {
    this._roleService.getRoles(this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se encontro el usuario");
        } else {
          this.roles = response;
          this.updateRoles();
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getAllRoles(){
    setTimeout(() => {
      this.getUserRoles();
    }, 350);

    setTimeout(() => {
      this.getRoles();
    }, 500);
  }

  assignRole() {
    let roleUser = new RoleUser(this.roleSelected, this.username);

    this._roleService.assignRole(roleUser, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se encontro el usuario");
          this.statusAssignRole = 'failed';
        }
        else {
          console.log("rol asignado correctamente");
          this.statusAssignRole = 'success';
         
          this.getAllRoles();
        }
      },
      error: (err) => {
        this.statusAssignRole = 'failed';
        console.log(err);
      }
    })
  }
}
