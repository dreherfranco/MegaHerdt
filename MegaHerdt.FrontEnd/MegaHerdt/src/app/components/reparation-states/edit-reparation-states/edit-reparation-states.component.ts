import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReparationState } from 'src/app/models/ReparationState/ReparationState';
import { ReparationStateService } from 'src/app/services/reparation-states/reparation-state.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogUpdateReparationStateComponent } from './dialog-update-reparation-state/dialog-update-reparation-state.component';

@Component({
  selector: 'app-edit-reparation-states',
  templateUrl: './edit-reparation-states.component.html',
  styleUrls: ['./edit-reparation-states.component.css']
})
export class EditReparationStatesComponent implements OnInit {
  reparationsStates: Array<ReparationState>;
  statusSubmit: string;

  constructor(private _storageService: StorageService, private _reparationStateService: ReparationStateService,
    public dialog: MatDialog) {
    this.reparationsStates = new Array<ReparationState>();
    this.statusSubmit = "";
  }


  ngOnInit(): void {
    this.loadReparationsStates();
  }

  openDialog(reparationState: ReparationState) {
    const dialogRef = this.dialog.open(DialogUpdateReparationStateComponent,
      {
        disableClose:true,
        data: reparationState
      });

    dialogRef.afterClosed().subscribe((result: ReparationState) => {
      if(result != undefined){
        this.updateReparationState(result);
      }
    });
  }
  
  loadReparationsStates(){
    this._reparationStateService.getAll().subscribe({
        next: (response) => {
          if (response.error) {
              console.log("no se pudieron cargar los estados de las reparaciones");
          } else {
            this.reparationsStates = response;
          }
        },
        error: (err) => {
          console.log(err)
        }
    });
  }

  deleteReparationState(id: number){
    this._reparationStateService.delete(id, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
              console.log("no se pudo eliminar el estado de reparacion");
              console.log(response)
          } else {
            console.log(response)
            this.loadReparationsStates();
          }
        },
        error: (err) => {
          console.log(err)
        }
    }
    );
  }

  updateReparationState(reparationState: ReparationState){
    this._reparationStateService.update(reparationState, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
              console.log("no se pudo actualizar el estado de la reparacion");
              this.statusSubmit = "failed";
          } else {
            this.statusSubmit = "success";
          }
        },
        error: (err) => {
          this.statusSubmit = "failed";
          console.log(err)
        }
    }
    );
  }

}
