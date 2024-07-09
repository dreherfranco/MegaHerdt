import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationUpdate } from 'src/app/models/Reparation/ReparationUpdate';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UpdateReparationStatePagadoComponent } from './update-reparation-state-pagado/update-reparation-state-pagado.component';
import { Sort } from '@angular/material/sort';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ReparationStatesEnum } from 'src/app/utils/ReparationStatesEnum';
import { DialogShowReparationDetailComponent } from '../../dialog-show-reparation-detail/dialog-show-reparation-detail.component';

@Component({
  selector: 'app-reparation-state-pagado',
  templateUrl: './reparation-state-pagado.component.html',
  styleUrls: ['./reparation-state-pagado.component.css']
})
export class ReparationStatePAGADOComponent implements OnInit {
  reparations: Array<Reparation>;
  sortedData: Reparation[] = [];
  paginate: Paginate;
  userAuthenticated: UserDetail = new UserDetail('','','','','',[]);
  @Input() searchText: string;
  quantityPageRecords: number = 5;

  constructor(private _storageService: StorageService,
    private _reparationService: ReparationService, public dialog: MatDialog,
    private _router: Router,) {
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
   if(!this._storageService.isHidePagadoStateAlert()){

      AlertService.warningAlert('¡Atención!', 
      'Los datos de facturación se cargan en esta pantalla',
      'De acuerdo', 
      'No volver a mostrar este mensaje')
      .then((result) => 
      {
        // Entra si se selecciona la opcion 'No volver a mostrar este mensaje' 
        if(result.isDismissed){
          this._storageService.hidePagadoStateAlert();
        }
      });
      
    }
  }

  loadReparations() {
    let stateId = 6;
    this._reparationService.getByStateId(stateId, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener reparaciones");
        } else {
          this.reparations = response;
          this.sortedData = this.reparations.slice();
          console.log(this.reparations)
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  openDialogUpdate(reparation: Reparation) {
    const dialogRef = this.dialog.open(UpdateReparationStatePagadoComponent,
      {
        disableClose: true,
        data: reparation
      });

    dialogRef.afterClosed().subscribe((result: Reparation) => {
      if (result != undefined) {
        this.update(result);
      }
    });
  }

  update(reparation: Reparation) {
    var reparationUpdate = this.mapperReparation(reparation);

    this._reparationService.update(reparationUpdate, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          AlertService.errorAlert('¡Error al intentar actualizar la Reparación!');
        } else {
          this.loadReparations();
          AlertService.successAlert('¡Actualizada!','Reparación actualizada correctamente').then((result) => {
            this._router.navigate([
              '/administrate/administrate-reparations/edit', 
              ReparationStatesEnum.ENTREGADO
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
      , reparation.employeeObservation, reparation.approximateTime);
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
        case 'facturada':
            return compare(a.facturada, b.facturada, isAsc);
         default:
          return 0;
      }
    });
  }

}

function compare(a: number | string | boolean | Date | string[], b: number | string | boolean | Date | string[], isAsc: boolean) {
  
   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
