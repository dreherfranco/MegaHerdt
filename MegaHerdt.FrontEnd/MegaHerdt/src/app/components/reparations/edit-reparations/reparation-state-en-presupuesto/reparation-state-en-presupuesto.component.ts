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

@Component({
  selector: 'app-reparation-state-en-presupuesto',
  templateUrl: './reparation-state-en-presupuesto.component.html',
  styleUrls: ['./reparation-state-en-presupuesto.component.css']
})
export class ReparationStateENPRESUPUESTOComponent implements OnInit {
  reparations: Array<Reparation>;
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
    const dialogRef = this.dialog.open(UpdateReparationStateENPRESUPUESTOComponent,
      {
        disableClose:true,
        data: data
      });

    dialogRef.afterClosed().subscribe((result: ReparationUpdateBudget) => {
      if(result != undefined){
        this.updateBudget(result);
      }
    });
  }

  updateBudget(reparation: ReparationUpdateBudget){
    this._reparationService.updateBudget(reparation, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al actualizar reparacion");
        } else {
          this.loadReparations();
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  openDialogRejectBudget(reparationId: number){
    let data = new ReparationUpdateBudget(reparationId, false, new Date());
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent,
      {
        disableClose:true,
        data: data
      });

    dialogRef.afterClosed().subscribe((result: ReparationUpdateBudget) => {
      if(result != undefined){
        this.updateBudget(result);
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
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

}
