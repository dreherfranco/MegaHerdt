import { Component, OnInit } from '@angular/core';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  users: Array<UserDetail>;
  paginate: Paginate;
  searchText: string;
  sortedData: UserDetail[] = [];

  constructor(private _storageService: StorageService, private _userService: UserService) {
    this.users = new Array<UserDetail>();
    this.paginate = new Paginate(1, 6);
    this.searchText = "";
  }

  ngOnInit(): void {
    this.loadUsers();
  }


  loadUsers() {
    this._userService.getEnabledUsers(this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se pudieron obtener los usuarios correctamente");
        } else {
          this.users = response;
          this.sortedData = this.users.slice();
        }

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'dni':
          return compare(a.dni, b.dni, isAsc);
        case 'surname':
          return compare(a.surname, b.surname, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'createdDate':
          return compare(a.createdDate, b.createdDate, isAsc);
        case 'lastLogin':
          return compare(a.lastLogin, b.lastLogin, isAsc);
        case 'roles':
          return compare(a.roles, b.roles, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string | Date | string[], b: number | string | Date | string[], isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}