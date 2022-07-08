import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-reparation-state-en-reparacion',
  templateUrl: './reparation-state-en-reparacion.component.html',
  styleUrls: ['./reparation-state-en-reparacion.component.css']
})
export class ReparationStateENREPARACIONComponent implements OnInit {
  reparations: Array<Reparation>;
  paginate: Paginate;
  
  constructor(private _storageService: StorageService,
    private _reparationService: ReparationService, public dialog: MatDialog) { 
    this.reparations = new Array<Reparation>();
    this.paginate = new Paginate(1,2);
  }

  ngOnInit(): void {
    this.loadReparations();
  }

  openDialogUpdate(reparationId: number){
    /*let data = new ReparationUpdateBudget(reparationId, true);
    const dialogRef = this.dialog.open(UpdateReparationStateENPRESUPUESTOComponent,
      {
        disableClose:true,
        data: data
      });

    dialogRef.afterClosed().subscribe((result: ReparationUpdateBudget) => {
      if(result != undefined){
        this.updateBudget(result);
      }
    });*/
  }

  loadReparations(){
    let stateId = 4;
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
