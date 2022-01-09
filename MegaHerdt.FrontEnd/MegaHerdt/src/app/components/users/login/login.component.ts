import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/models/User/UserLogin';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  statusSubmit: string;

  constructor(private _userService: UserService, private _router: Router) {
    this.statusSubmit = "";
    this.loginForm = new FormGroup({});

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          Validators.email
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
    this._userService.login(userLogin).subscribe(
      {
        next: (response) => {
          if (response.error) {
            this.statusSubmit = "failed";
          }
          else {
           // this._router.navigate(['']);
            console.log(response);  
          }
        },
        error: (err) => {
          this.statusSubmit = "failed";
          console.log(err)
        }
      });

  }
  
 
}
