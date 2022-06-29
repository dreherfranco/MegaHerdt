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
  userName: string = '';

  constructor(
    private _route: ActivatedRoute, 
    private _userService: UserService, 
  ) 
  {
    this.user = new UserDetail('','','','','',new Array<string>()) ;
    this.roles = new Array<string>();
  }

  ngOnInit(): void {
     this.getUserName();
     this.getUser(this.userName);
  }

  getUserName(): any{
    this._route.params.subscribe(
      params => {
        this.userName = params['userName'];
      }
    );

  }

  getUser(userName: string){
    this._userService.getByUserName(userName).subscribe({
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
