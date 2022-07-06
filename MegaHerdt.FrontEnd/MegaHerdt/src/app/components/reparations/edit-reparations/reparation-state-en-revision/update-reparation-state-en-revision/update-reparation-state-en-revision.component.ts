import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ReparationArticle } from 'src/app/models/Article/ReparationArticle';
import { Bill } from 'src/app/models/Bill/Bill';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ReparationState } from 'src/app/models/ReparationState/ReparationState';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ArticleService } from 'src/app/services/articles/article.service';
import { ReparationStateService } from 'src/app/services/reparation-states/reparation-state.service';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-update-reparation-state-en-revision',
  templateUrl: './update-reparation-state-en-revision.component.html',
  styleUrls: ['./update-reparation-state-en-revision.component.css']
})
export class UpdateReparationStateENREVISIONComponent implements OnInit {
  articles: Array<ArticleName>;
  clients: Array<UserDetail>;
  reparationsStates: Array<ReparationState>;
  reparationArticle: ReparationArticle;
  paginate: Paginate;

  constructor(private _articleService: ArticleService,
    private _storageService: StorageService, private _userService: UserService,
    private _reparationStateService: ReparationStateService, 
    private _reparationService: ReparationService,
    public dialogRef: MatDialogRef<UpdateReparationStateENREVISIONComponent>,
    @Inject(MAT_DIALOG_DATA) public reparation: Reparation) { 
    this.articles = new Array<ArticleName>();
    this.clients = new Array<UserDetail>();
    this.reparationsStates = new Array<ReparationState>();
    this.reparationArticle = new ReparationArticle(0,0,0,"");
    this.paginate = new Paginate(1,2);
  }

  ngOnInit(): void {
    this.loadArticles();
    this.loadClients();
    this.loadReparationsStates();
  }

  confirm(){
    this.dialogRef.close(this.reparation);
  }

  closeModal(){
    this.dialogRef.close();
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

  addArticleReparation() {
    var articleName = "";
    //buscar el articulo para extraer el nombre
    for (let article of this.articles) {
      if (article.id == this.reparationArticle.articleId)
        articleName = article.name;
    }
    var reparationArticle = new ReparationArticle(this.reparationArticle.articleId, this.reparationArticle.articleQuantity,0,articleName);
    this.reparation.reparationsArticles.push(reparationArticle);
  }
}
