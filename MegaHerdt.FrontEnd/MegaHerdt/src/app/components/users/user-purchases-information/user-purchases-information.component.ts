import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-user-purchases-information',
  templateUrl: './user-purchases-information.component.html',
  styleUrls: ['./user-purchases-information.component.css']
})
export class UserPurchasesInformationComponent implements OnInit {
  users: Array<UserDetail>;
  paginate: Paginate;
  searchText: string;
  sortedData: UserDetail[] = [];
  
  @Input() startDate!: Date;
  @Input() endDate!: Date;
  
  totalPurchases: number = 0;
  totalReparations: number = 0;

  constructor(private _storageService: StorageService, private _userService: UserService) 
  { 
    this.users = new Array<UserDetail>();
    this.paginate = new Paginate(1, 6);
    this.searchText = "";
  }

  ngOnInit(): void
  {
    //this.loadUsers(this.startDate, this.endDate);
  }

  // Detecta cambios en los inputs de fechas
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'] || changes['endDate']) {
      // Ejecuta la búsqueda cuando cambien las fechas.
      this.loadUsers(this.startDate, this.endDate);
    }
  }

  loadUsers(startDate: Date, endDate: Date) 
  {
    this._userService.getTopUsersByPurchase(this._storageService.getTokenValue(), startDate, endDate).subscribe({
      next: (response) => {
        if (response.error) 
          {
          console.log("no se pudieron obtener los usuarios correctamente");
        } else 
        {
          this.users = response;
          this.sortedData = this.users.slice();
          this.calculateTotals();
        }

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  calculateTotals() {
    this.totalPurchases = this.users.reduce((sum, user) => sum + user.purchasesCount, 0);
    this.totalReparations = this.users.reduce((sum, user) => sum + user.reparationsCount, 0);
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
        case 'lastLogin':
          return compare(a.lastLogin, b.lastLogin, isAsc);
        case 'purchasesCount':
          return compare(a.purchasesCount, b.purchasesCount, isAsc);
        case 'reparationsCount':
          return compare(a.reparationsCount, b.reparationsCount, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string | Date | string[], b: number | string | Date | string[], isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}