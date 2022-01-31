import { Component, OnInit } from '@angular/core';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  users: Array<UserDetail>;
  paginate: Paginate;
  searchText: string;

  constructor(private _storageService: StorageService, private _userService: UserService) {
    this.users = new Array<UserDetail>();
    this.paginate = new Paginate(1,6);
    this.searchText = "";
   }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this._userService.getUsers(this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se pudieron obtener los usuarios correctamente");
        } else {
            this.users = response;    
        }
        
      },
      error: (err) => {          
        console.log(err);
      }
    });
  }
}
