import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDeleteComponent } from 'src/app/components/general/dialog-confirm-delete/dialog-confirm-delete.component';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ReparationArticle } from 'src/app/models/Article/ReparationArticle';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationUpdate } from 'src/app/models/Reparation/ReparationUpdate';
import { ReparationState } from 'src/app/models/ReparationState/ReparationState';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ArticleService } from 'src/app/services/articles/article.service';
import { ReparationStateService } from 'src/app/services/reparation-states/reparation-state.service';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';
import { DialogUpdateReparationComponent } from '../dialog-update-reparation/dialog-update-reparation.component';

@Component({
  selector: 'app-reparation-state-ingreso',
  templateUrl: './reparation-state-ingreso.component.html',
  styleUrls: ['./reparation-state-ingreso.component.css']
})
export class ReparationStateINGRESOComponent implements OnInit {
  reparations: Array<Reparation>;
  articles: Array<ArticleName>;
  clients: Array<UserDetail>;
  reparationsStates: Array<ReparationState>;
  reparationArticle: ReparationArticle;
  paginate: Paginate;
  
  constructor(private _articleService: ArticleService,
    private _storageService: StorageService, private _userService: UserService,
    private _reparationStateService: ReparationStateService, 
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

  openDialogUpdate(reparation: Reparation){
    const dialogRef = this.dialog.open(DialogUpdateReparationComponent,
      {
        disableClose:true,
        data: reparation
      });

    dialogRef.afterClosed().subscribe((result: Reparation) => {
      if(result != undefined){
        this.update(result);
      }
    });
  }

  openDialogDelete(reparationId: number){
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent,
      {
        disableClose:true,
        data: reparationId
      });

    dialogRef.afterClosed().subscribe((result: number) => {
      if(result != undefined){
        this.deleteReparation(result);
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

  update(reparation: Reparation){
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

  mapperReparation(reparation: Reparation): ReparationUpdate{
    let identity = this._storageService.getIdentity();
    return new ReparationUpdate(reparation.id, reparation.reparationState.id, identity.id,reparation.client.id,
      reparation.amount,reparation.date,reparation.reparationsArticles,reparation.bill, reparation.clientDescription);
  }

  loadReparations(){
    let stateId = 1;
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