import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserChangePassword } from 'src/app/models/User/UserChangePassword';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({});
  statusSubmit: string;

  constructor(
    private _userService: UserService, 
    private _router: Router, 
    private _storageService: StorageService
    ) 
  {
    this.statusSubmit = "";
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
    var user = new UserChangePassword(identity.email, data.currentPassword,data.newPassword);
    this._userService.changePassword(user, this._storageService.getTokenValue()).subscribe({
      next: (result) => {
        if(result.error){
          this.statusSubmit = "failed";
        }else{
          this.statusSubmit = "success";
          
          form.reset();
        }
        console.log(result)
      },
      error: (err) => { console.log(err); }
    });
  }
}
