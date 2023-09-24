import { Component, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-reparation-state-cancelado',
  templateUrl: './reparation-state-cancelado.component.html',
  styleUrls: ['./reparation-state-cancelado.component.css']
})
export class ReparationStateCANCELADOComponent implements OnInit {
  reparations: Array<Reparation>;
  sortedData: Reparation[] = [];
  paginate: Paginate;
  @Input() searchText: string;
  quantityPageRecords: number = 5;

  constructor(private _storageService: StorageService,
    private _reparationService: ReparationService) { 
    this.reparations = new Array<Reparation>();
    this.paginate = new Paginate(1, this.quantityPageRecords);
    this.searchText = '';

  }

  ngOnInit(): void {
    this.loadReparations();
  }

  loadReparations(){
    let stateId = 8;
    this._reparationService.getByStateId(stateId, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener reparaciones");
        } else {
          this.reparations = response;
          this.sortedData = this.reparations.slice();
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
        case 'ticket':
          return compare(a.id, b.id, isAsc);
        case 'employeeEmail':
          return compare(a.employee.email, b.employee.email, isAsc);
        case 'clientEmail':
            return compare(a.client.email, b.client.email, isAsc);
        case 'date':
              return compare(a.date, b.date, isAsc);
        case 'reparationState':
            return compare(a.reparationState.name, b.reparationState.name, isAsc);
        case 'clientDescription':
            return compare(a.clientDescription, b.clientDescription, isAsc);
       case 'employeeObservation':
            return compare(a.employeeObservation, b.employeeObservation, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string | Date | string[], b: number | string | Date | string[], isAsc: boolean) {
  
   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
