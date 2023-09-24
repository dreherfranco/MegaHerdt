import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserChangePassword } from 'src/app/models/User/UserChangePassword';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({});

  constructor(
    private _userService: UserService, 
    private _router: Router, 
    private _storageService: StorageService
    ) 
  {
  }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      newPassword: new FormControl('',
        [
          Validators.required,
          Validators.minLength(5)
        ]),
        currentPassword: new FormControl('',
        [
          Validators.required,
          Validators.minLength(5)
        ])
    });
  }

  onSubmit(form: any){
    var data = this.changePasswordForm.getRawValue();
    var identity: UserDetail = this._storageService.getIdentity();
    var user = new UserChangePassword(identity.userName, data.currentPassword,data.newPassword);
    this._userService.changePassword(user, this._storageService.getTokenValue()).subscribe({
      next: (result) => {
        if(result.error){
          AlertService.errorAlert('¡Error!', 'Error al intentar actualizar su contraseña');
        }else{
          AlertService.successAlert('¡Actualizada!', 'Contraseña actualizada con exito')   
          .then((result) => {
            form.reset();
          });       
        }
        console.log(result)
      },
      error: (err) => 
      { 
        AlertService.errorAlert('¡Error!', 'Error al intentar actualizar su contraseña');
        console.log(err); 
      }
    });
  }
}
