import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDeleteComponent } from 'src/app/components/general/dialog-confirm-delete/dialog-confirm-delete.component';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationUpdateBudget } from 'src/app/models/Reparation/ReparationUpdateBudget';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UpdateReparationStateENPRESUPUESTOComponent } from './update-reparation-state-en-presupuesto/update-reparation-state-en-presupuesto.component';
import { ReparationUpdate } from 'src/app/models/Reparation/ReparationUpdate';
import { Sort } from '@angular/material/sort';
import { AlertService } from 'src/app/services/Alerts/AlertService';

@Component({
  selector: 'app-reparation-state-en-presupuesto',
  templateUrl: './reparation-state-en-presupuesto.component.html',
  styleUrls: ['./reparation-state-en-presupuesto.component.css']
})
export class ReparationStateENPRESUPUESTOComponent implements OnInit {
  reparations: Array<Reparation>;
  sortedData: Reparation[] = [];
  paginate: Paginate;
  userAuthenticated: UserDetail = new UserDetail('','','','','',[]);
  @Input() searchText: string;

  constructor(private _storageService: StorageService,
    private _reparationService: ReparationService, public dialog: MatDialog) { 
    this.reparations = new Array<Reparation>();
    this.paginate = new Paginate(1,2);
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

  openDialogUpdate(reparationId: number){
    let data = new ReparationUpdateBudget(reparationId, true, new Date());

    AlertService.warningAlert('¿Seguro que quieres pasar al estado EN REPARACIÓN?')
    .then((result) => {
      if (result.isConfirmed) {     
          this.updateBudget(data);
      }
    });
   
  }

  updateBudget(reparation: ReparationUpdateBudget){
    this._reparationService.updateBudget(reparation, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          AlertService.errorAlert('¡Error al intentar actualizar la Reparación!');
        } else {
          this.loadReparations();
          AlertService.successAlert('¡Actualizada!','Reparación actualizada correctamente');
        }
      },
      error: (err) => {
        console.log(err)
        AlertService.errorAlert('¡Error al intentar actualizar la Reparación!');
      }
    })
  }

  openDialogBackToRevision(reparation: Reparation){
    AlertService.warningAlert('¿Seguro que quieres volver al estado EN REVISIÓN?')
    .then((result) => {
      if (result.isConfirmed) {     
          this.updateDecrementState(reparation);
      }
    });
  }

  updateDecrementState(reparation: Reparation) {
    var reparationUpdate = this.mapperReparation(reparation);
    this._reparationService.updateDecrementState(reparationUpdate, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          AlertService.errorAlert('¡Error al intentar actualizar la Reparación!');
        } else {
          this.loadReparations();
          AlertService.successAlert('¡Actualizada!','Reparación actualizada correctamente');
        }
      },
      error: (err) => {
        console.log(err)
        AlertService.errorAlert('¡Error al intentar actualizar la Reparación!');
      }
    })
  }

  mapperReparation(reparation: Reparation): ReparationUpdate {
    let identity = this._storageService.getIdentity();
    return new ReparationUpdate(reparation.id, reparation.reparationState.id, identity.id, reparation.client.id,
      reparation.amount, reparation.date, reparation.reparationsArticles, reparation.bill, reparation.clientDescription
      , reparation.employeeObservation, reparation.approximateTime);
  }


  openDialogRejectBudget(reparationId: number){
    let data = new ReparationUpdateBudget(reparationId, false, new Date());

    AlertService.warningAlert('¿Seguro que quieres cancelar el Presupuesto y enviar la reparación al estado CANCELADO?')
    .then((result) => {
      if (result.isConfirmed) {     
          this.updateBudget(data);
      }
    });
  }

  loadReparations(){
    let stateId = 3;
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
       case 'approximateTime':
            return compare(a.approximateTime, b.approximateTime, isAsc);
        case 'amount':
              return compare(a.amount, b.amount, isAsc);
        case 'totalArticleAmount':
              return compare(a.totalArticleAmount, b.totalArticleAmount, isAsc);
        case 'total':
              return compare(a.totalArticleAmount + a.amount, b.totalArticleAmount + b.amount, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string | Date | string[], b: number | string | Date | string[], isAsc: boolean) {
  
   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}