import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ReparationArticle } from 'src/app/models/Article/ReparationArticle';
import { ReparationArticleUpdate } from 'src/app/models/Article/ReparationArticleUpdate';
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
import { BillTypeEnum } from 'src/app/utils/BillTypeEnum';
import { DialogUpdateReparationComponent } from './dialog-update-reparation/dialog-update-reparation.component';

@Component({
  selector: 'app-edit-reparations',
  templateUrl: './edit-reparations.component.html',
  styleUrls: ['./edit-reparations.component.css']
})
export class EditReparationsComponent implements OnInit {
  reparations: Array<Reparation>;
  articles: Array<ArticleName>;
  clients: Array<UserDetail>;
  billTypes = BillTypeEnum;
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
    this.paginate = new Paginate(1,6);
  }

  ngOnInit(): void {
    this.loadReparations();
    this.loadArticles();
    this.loadClients();
    this.loadReparationsStates();
  }

  openDialog(reparation: Reparation){
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
      reparation.amount,reparation.date,reparation.reparationsArticles,reparation.bill);
  }

  loadReparations(){
    this._reparationService.getAll(this._storageService.getTokenValue()).subscribe({
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

  loadArticles() {
    this._articleService.getArticleNames().subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener articulos");
        } else {
          this.articles = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  loadReparationsStates() {
    this._reparationStateService.getAll().subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener los estados de las reparaciones");
        } else {
          this.reparationsStates = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
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

  addArticleReparation(reparation: Reparation) {
    var articleName = "";
    //buscar el articulo para extraer el nombre
    for (let article of this.articles) {
      if (article.id == this.reparationArticle.articleId)
        articleName = article.name;
    }
    var reparationArticle = new ReparationArticle(this.reparationArticle.articleId, this.reparationArticle.articleQuantity,0,articleName);
    reparation.reparationsArticles.push(reparationArticle);
  }
}
