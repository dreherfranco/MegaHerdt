import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDeleteComponent } from 'src/app/components/general/dialog-confirm-delete/dialog-confirm-delete.component';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ReparationArticle } from 'src/app/models/Article/ReparationArticle';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationUpdate } from 'src/app/models/Reparation/ReparationUpdate';
import { ReparationUpdateBudget } from 'src/app/models/Reparation/ReparationUpdateBudget';
import { ReparationState } from 'src/app/models/ReparationState/ReparationState';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';
import { UpdateReparationStateENREVISIONComponent } from '../reparation-state-en-revision/update-reparation-state-en-revision/update-reparation-state-en-revision.component';
import { UpdateReparationStateENPRESUPUESTOComponent } from './update-reparation-state-en-presupuesto/update-reparation-state-en-presupuesto.component';

@Component({
  selector: 'app-reparation-state-en-presupuesto',
  templateUrl: './reparation-state-en-presupuesto.component.html',
  styleUrls: ['./reparation-state-en-presupuesto.component.css']
})
export class ReparationStateENPRESUPUESTOComponent implements OnInit {
  reparations: Array<Reparation>;
  articles: Array<ArticleName>;
  clients: Array<UserDetail>;
  reparationsStates: Array<ReparationState>;
  reparationArticle: ReparationArticle;
  paginate: Paginate;
  
  constructor(private _storageService: StorageService, private _userService: UserService,
    private _reparationService: ReparationService, public dialog: MatDialog) { 
    this.reparations = new Array<Reparation>();
    this.articles = new Array<ArticleName>();
    this.clients = new Array<UserDetail>();
    this.reparationsStates = new Array<ReparationState>();
    this.reparationArticle = new ReparationArticle(0,0,0,"");
    this.paginate = new Paginate(1,2);
  }

  ngOnInit(): void {
    this.loadReparations();
    this.loadClients();
  }

  openDialogUpdate(reparationId: number){
    let data = new ReparationUpdateBudget(reparationId, true);
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
    let data = new ReparationUpdateBudget(reparationId, false);
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

  deleteReparation(reparationId: number){
    this._reparationService.delete(reparationId, this._storageService.getTokenValue()).subscribe({
      next: (response) =>{
        if(response.error){
          console.log("error al eliminar reparacion");
        }else{
          this.loadReparations();
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
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

  loadClients() {
    this._userService.getUsers(this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener los usuarios");
        } else {
          this.clients = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
