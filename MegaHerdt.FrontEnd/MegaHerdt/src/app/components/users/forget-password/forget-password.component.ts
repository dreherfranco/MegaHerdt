import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForgetPassword } from 'src/app/models/User/UserForgetPassword';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;
  statusSubmit: string;

  constructor(
    private _userService: UserService, 
    private _router: Router, 
    ) 
  {
    this.statusSubmit = "";
    this.forgetPasswordForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),
    });

  }

  onSubmit(form: any) {
    var data = this.forgetPasswordForm.getRawValue();
    var userForgetPassword = new UserForgetPassword(data.email);
    this._userService.forgetPassword(userForgetPassword).subscribe(
      {
        next: (response) => {
          console.log(response);
          if (response.error) {
            this.statusSubmit = "failed";
          }
          else {
            this.statusSubmit = "success";         
          }
        },
        error: (err) => {
          this.statusSubmit = "failed";
          console.log(err)
        }
      });
  }
}