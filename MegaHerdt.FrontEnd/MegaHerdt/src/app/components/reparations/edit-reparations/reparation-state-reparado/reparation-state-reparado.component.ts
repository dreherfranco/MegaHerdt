import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationUpdate } from 'src/app/models/Reparation/ReparationUpdate';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UpdateReparationStateREPARADOComponent } from './update-reparation-state-reparado/update-reparation-state-reparado.component';
import { Sort } from '@angular/material/sort';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { ReparationStatesEnum } from 'src/app/utils/ReparationStatesEnum';
import { Router } from '@angular/router';
import { DialogShowReparationDetailComponent } from '../../dialog-show-reparation-detail/dialog-show-reparation-detail.component';

@Component({
  selector: 'app-reparation-state-reparado',
  templateUrl: './reparation-state-reparado.component.html',
  styleUrls: ['./reparation-state-reparado.component.css']
})
export class ReparationStateREPARADOComponent implements OnInit {
  reparations: Array<Reparation>;
  sortedData: Reparation[] = [];
  paginate: Paginate;
  userAuthenticated: UserDetail = new UserDetail('','','','','',[]);
  @Input() searchText: string;
  quantityPageRecords: number = 5;

  constructor(private _storageService: StorageService,
    private _reparationService: ReparationService, 
    private _router: Router,
    public dialog: MatDialog) {
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

      // Se muestra el dialogo de advertencia solo si no se ha seleccionado la opcion de "No volver a mostrar"
    if(!this._storageService.isHideReparadoStateAlert()){

      AlertService.warningAlert('¡Atención!', 
      'Las reparaciones pasarán al siguiente estado (Pagado) cuando el cliente realize el pago.',
      'De acuerdo', 
      'No volver a mostrar este mensaje')
      .then((result) => 
      {
        // Entra si se selecciona la opcion 'No volver a mostrar este mensaje' 
        if(result.isDismissed){
          this._storageService.hideReparadoStateAlert();
        }
      });
      
    }

  }

  openDialogUpdate(reparation: Reparation) {
    const dialogRef = this.dialog.open(UpdateReparationStateREPARADOComponent,
      {
        disableClose:true,
        data: reparation,
        maxHeight: '90vh',
        panelClass: 'custom-dialog-container'
      });

    dialogRef.afterClosed().subscribe((result: Reparation) => {
      if(result != undefined){
        this.update(result);
      }else{
        this.loadReparations();
      }
    });
  }

  loadReparations() {
    let stateId = 5;
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

  update(reparation: Reparation) {
    var reparationUpdate = this.mapperReparation(reparation);

    this._reparationService.updateReparationFromReparadoToPresupuesto(reparationUpdate, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          AlertService.errorAlert('¡Error al intentar actualizar la Reparación!');
        } else {
          this.loadReparations();
          AlertService.successAlert('¡Actualizada!','Reparación actualizada correctamente')
          .then((result) => {
            this._router.navigate([
              '/administrate/administrate-reparations/edit', 
              ReparationStatesEnum.PAGADO
            ]);
          });
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
      , reparation.employeeObservation, reparation.diagnostic, reparation.approximateTime, reparation.tipoObjeto, reparation.paymentsQuantity, reparation.methodOfPayment);
  }
  
  openShowReparationDetail(reparation: Reparation){
    this.dialog.open(DialogShowReparationDetailComponent,
      {
        disableClose:true,
        data: reparation,
        width: '550px'
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
       case 'diagnostic':
            return compare(a.diagnostic, b.diagnostic, isAsc);
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
