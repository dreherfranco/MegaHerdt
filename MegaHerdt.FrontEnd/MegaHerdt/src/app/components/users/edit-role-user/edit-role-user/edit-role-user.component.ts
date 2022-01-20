import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-edit-role-user',
  templateUrl: './edit-role-user.component.html',
  styleUrls: ['./edit-role-user.component.css']
})
export class EditRoleUserComponent implements OnInit {
  user: UserDetail;
  roles: Array<string>;

  constructor(
    private _route: ActivatedRoute, 
    private _userService: UserService, 
  ) 
  {
    this.user = new UserDetail('','','','','',new Array<string>()) ;
    this.roles = new Array<string>();
  }

  ngOnInit(): void {
     let email = this.getEmail();
     this.getUser(email);
  }

  getEmail(): any{
    let email;
    this._route.params.subscribe(
      params => {
        email = params['email'];
      }
    );

    if(email) return email; 
    else console.log("no existe el id");
  }

  getUser(email: string){
    this._userService.getByEmail(email).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se encontro el usuario");
        } else {
            this.user = response;  
        }
      },
      error: (err) => {          
        console.log(err);
      }
    })
  }

 

}
