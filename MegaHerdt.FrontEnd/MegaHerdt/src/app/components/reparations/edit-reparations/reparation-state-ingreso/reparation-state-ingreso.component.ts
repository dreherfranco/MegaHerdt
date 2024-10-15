import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Bill } from 'src/app/models/Bill/Bill';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationUpdate } from 'src/app/models/Reparation/ReparationUpdate';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogUpdateReparationComponent } from '../dialog-update-reparation/dialog-update-reparation.component';
import { UpdateReparationStateINGRESOComponent } from './update-reparation-state-ingreso/update-reparation-state-ingreso.component';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { Router } from '@angular/router';
import { ReparationStatesEnum } from 'src/app/utils/ReparationStatesEnum';

@Component({
  selector: 'app-reparation-state-ingreso',
  templateUrl: './reparation-state-ingreso.component.html',
  styleUrls: ['./reparation-state-ingreso.component.css']
})
export class ReparationStateINGRESOComponent implements OnInit   {
  reparations: Array<Reparation>;
  sortedData: Reparation[] = [];
  paginate: Paginate;
  userAuthenticated: UserDetail = new UserDetail('','','','','',[]);
  @Input() searchText: string;
  quantityPageRecords: number = 5;

  constructor(private _storageService: StorageService, 
    private _reparationService: ReparationService, 
    public dialog: MatDialog,
    private _router: Router) { 
    this.reparations = new Array<Reparation>();
    this.paginate = new Paginate(1, this.quantityPageRecords);
    this.searchText = '';
  }

  ngOnInit(): void {
    this.loadReparations();

    this._storageService.identityObserver.subscribe({
      next: (res) =>{
        this.userAuthenticated = res;

      }
    });
  }

  openDialogUpdate(reparation: Reparation){
    AlertService.warningAlert('¿Seguro que quieres pasar al estado EN REVISION?')
    .then((result) => {
      if (result.isConfirmed) {     
          this.update(reparation);
      }
    });
   
  }

  update(reparation: Reparation){
    var reparationUpdate = this.mapperReparation(reparation);
    
    this._reparationService.update(reparationUpdate, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          AlertService.errorAlert('¡Error al intentar actualizar la Reparación!');
        } else {
          this.loadReparations();
          AlertService.successAlert('¡Actualizada!','Reparación actualizada correctamente')
          .then((result) => {
            this._router.navigate(['/administrate/administrate-reparations/edit', ReparationStatesEnum.EN_REVISION]);
          });
        }
      },
      error: (err) => {
        AlertService.errorAlert('¡Error al intentar actualizar la Reparación!');
        console.log(err)
      }
    })
  }

  mapperReparation(reparation: Reparation): ReparationUpdate{
    let identity = this._storageService.getIdentity();
    return new ReparationUpdate(reparation.id, reparation.reparationState.id, identity.id,reparation.client.id,
      reparation.amount,reparation.date,reparation.reparationsArticles,new Bill(0,'00001','00000000','A'), reparation.clientDescription
      ,reparation.employeeObservation, reparation.diagnostic,reparation.approximateTime, reparation.tipoObjeto);
  }

  loadReparations(){
    let stateId = 1;
    this._reparationService.getByStateId(stateId, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener reparaciones");
        } else {
          this.reparations = response;
          this.sortedData = this.reparations.slice()
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