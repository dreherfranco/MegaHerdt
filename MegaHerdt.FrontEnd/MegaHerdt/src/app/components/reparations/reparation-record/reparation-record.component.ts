import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationUpdateBudget } from 'src/app/models/Reparation/ReparationUpdateBudget';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { PDFGenerator } from 'src/app/utils/PDFGenerator';
import { DialogShowReparationDetailComponent } from '../dialog-show-reparation-detail/dialog-show-reparation-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reparation-record',
  templateUrl: './reparation-record.component.html',
  styleUrls: ['./reparation-record.component.css']
})
export class ReparationRecordComponent implements OnInit {
  reparations: Array<Reparation>;
  paginate: Paginate;
  sortedData: Reparation[] = [];
  @ViewChild('content', { static: true }) content!: ElementRef;
  searchText: string = '';

  constructor(private _storageService: StorageService,
    private _reparationService: ReparationService,public dialog: MatDialog) { 
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

  acceptBudgetDialog(reparationId: number){
    let data = new ReparationUpdateBudget(reparationId, true, new Date());

    AlertService.warningAlert('¿Seguro que quieres aceptar el Presupuesto?')
    .then((result) => {
      if (result.isConfirmed) {     
          this.updateBudget(data);
      }
    });
   
  }

  openDialogRejectBudget(reparationId: number){
    let data = new ReparationUpdateBudget(reparationId, false, new Date());

    AlertService.warningAlert('¿Seguro que quieres rechazar el Presupuesto?', '¡No podrás revertirlo!')
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
          AlertService.successAlert('¡Actualizada!','Presupuesto aceptado correctamente')
          .then((result) => {
           // Ver que hacer cuando se acepta el presupuesto
          });
        }
      },
      error: (err) => {
        console.log(err)
        AlertService.errorAlert('¡Error al intentar actualizar la Reparación!');
      }
    })
  }

  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
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
