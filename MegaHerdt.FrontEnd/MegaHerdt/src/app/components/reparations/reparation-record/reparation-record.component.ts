import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-reparation-record',
  templateUrl: './reparation-record.component.html',
  styleUrls: ['./reparation-record.component.css']
})
export class ReparationRecordComponent implements OnInit {
  reparations: Array<Reparation>;
  paginate: Paginate;
  sortedData: Reparation[] = [];

  constructor(private _storageService: StorageService,
    private _reparationService: ReparationService) { 
    this.reparations = new Array<Reparation>();
    this.paginate = new Paginate(1,4);
  }

  ngOnInit(): void {
    this.loadReparations();
  }

  loadReparations(){
    var identity: UserDetail = this._storageService.getIdentity();
    this._reparationService.getClientReparations(identity.id, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener reparaciones");
        } else {
          this.reparations = response;
          this.sortedData = this.reparations.slice();

          console.log(response)
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.reparations.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
          case 'employeeEmail':
            return compare(a.employee.email, b.employee.email, isAsc);
          case 'clientEmail':
            return compare(a.client.email, b.client.email, isAsc);
          case 'amount':
            return compare(a.amount, b.amount, isAsc);
          case 'totalArticleAmount':
            return compare(a.totalArticleAmount, b.totalArticleAmount, isAsc);
          case 'total':
            return compare((a.totalArticleAmount + a.amount), (b.totalArticleAmount + b.amount), isAsc);
          case 'date':
            return compare(a.date, b.date, isAsc);
          case 'reparationState':
            return compare(a.reparationState.name, b.reparationState.name, isAsc);
          case 'billNumber':
            return compare(a.bill.number, b.bill.number, isAsc);
          case 'billType':
            return compare(a.bill.type, b.bill.type, isAsc);
          default:
            return 0;
      }
    });
  }

}

function compare(a: number | boolean | string | Date | string[], b: number | boolean | string | Date | string[], isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}