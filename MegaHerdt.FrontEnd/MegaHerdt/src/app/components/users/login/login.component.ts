import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/models/User/UserLogin';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  statusSubmit: string;
  errorString: string = '';

  constructor(
    private _userService: UserService, 
    private _router: Router, 
    private _storageService: StorageService
    ) 
  {
    this.statusSubmit = "";
    this.loginForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
     //     Validators.email
        ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(5)
        ]),
    });

  }

  onSubmit(form: any) {
    var data = this.loginForm.getRawValue();
    var userLogin = new UserLogin(data.email, data.password);
    userLogin.userName = data.email;
    this._userService.login(userLogin).subscribe(
      {
        next: (response) => {
          console.log(response);
          if (response.error) {
            this.statusSubmit = "failed";
          }
          else {
            this._storageService.setTokenCredentials(response.userToken); 
            this._storageService.setIdentity(response);
            this._router.navigate(['']);           
          }
        },
        error: (err) => {
          this.statusSubmit = "failed";
          console.log(err)
          if(err.error.message.includes("UserNotEnabled")){
            this.errorString = "Esta cuenta ha sido deshabilitada, contactese para mas información.";
          };
        }
      });
  }
  
  authenticated(): boolean{
    return this._storageService.isAuthenticated();
  }
 
}
