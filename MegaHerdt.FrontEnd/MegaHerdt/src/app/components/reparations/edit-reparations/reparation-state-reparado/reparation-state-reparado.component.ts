import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationUpdate } from 'src/app/models/Reparation/ReparationUpdate';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UpdateReparationStateREPARADOComponent } from './update-reparation-state-reparado/update-reparation-state-reparado.component';

@Component({
  selector: 'app-reparation-state-reparado',
  templateUrl: './reparation-state-reparado.component.html',
  styleUrls: ['./reparation-state-reparado.component.css']
})
export class ReparationStateREPARADOComponent implements OnInit {
  reparations: Array<Reparation>;
  paginate: Paginate;
  userAuthenticated: UserDetail = new UserDetail('','','','','',[]);
  searchText: string;

  constructor(private _storageService: StorageService,
    private _reparationService: ReparationService, public dialog: MatDialog) {
    this.reparations = new Array<Reparation>();
    this.paginate = new Paginate(1, 2);
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

  openDialogUpdate(reparation: Reparation) {
    const dialogRef = this.dialog.open(UpdateReparationStateREPARADOComponent,
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

  loadReparations() {
    let stateId = 5;
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

  update(reparation: Reparation) {
    var reparationUpdate = this.mapperReparation(reparation);

    this._reparationService.update(reparationUpdate, this._storageService.getTokenValue()).subscribe({
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
  
  mapperReparation(reparation: Reparation): ReparationUpdate {
    let identity = this._storageService.getIdentity();
    return new ReparationUpdate(reparation.id, reparation.reparationState.id, identity.id, reparation.client.id,
      reparation.amount, reparation.date, reparation.reparationsArticles, reparation.bill, reparation.clientDescription
      , reparation.employeeObservation, reparation.approximateTime);
  }

}
