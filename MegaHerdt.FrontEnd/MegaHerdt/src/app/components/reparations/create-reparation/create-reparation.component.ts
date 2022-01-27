import { Component, OnInit } from '@angular/core';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ReparationArticleAdded } from 'src/app/models/Article/ReparationArticleAdded';
import { ReparationArticleCreation } from 'src/app/models/Article/ReparationArticleCreation';
import { BillCreation } from 'src/app/models/Bill/BillCreation';
import { ReparationCreation } from 'src/app/models/Reparation/ReparationCreation';
import { ReparationState } from 'src/app/models/ReparationState/ReparationState';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { ArticleService } from 'src/app/services/articles/article.service';
import { ReparationStateService } from 'src/app/services/reparation-states/reparation-state.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';
import { BillTypeEnum } from 'src/app/utils/BillTypeEnum';

@Component({
  selector: 'app-create-reparation',
  templateUrl: './create-reparation.component.html',
  styleUrls: ['./create-reparation.component.css']
})
export class CreateReparationComponent implements OnInit {
  articles: Array<ArticleName>;
  clients: Array<UserDetail>;
  billTypes = BillTypeEnum;
  reparation: ReparationCreation;
  reparationsStates: Array<ReparationState>;
  reparationArticle: ReparationArticleCreation;
  articlesAdded: Array<ReparationArticleAdded>;

  constructor(private _articleService: ArticleService,
    private _storageService: StorageService, private _userService: UserService,
    private _reparationStateService: ReparationStateService) { 
    this.articles = new Array<ArticleName>();
    this.clients = new Array<UserDetail>();
    this.reparation = new ReparationCreation(0,'','',0,new Date(),
    new Array<ReparationArticleCreation>(),new BillCreation(0,''));
    this.reparationsStates = new Array<ReparationState>();
    this.reparationArticle = new ReparationArticleCreation(0,0);
    this.articlesAdded = new Array<ReparationArticleAdded>();
  }

  ngOnInit(): void {
    this.loadArticles();
    this.loadClients();
    this.loadReparationsStates();
  }

  onSubmit(form: any){
    
  }

  loadArticles(){
    this._articleService.getArticleNames().subscribe({
      next: (response) =>{
        if(response.error){
          console.log("error al obtener articulos");
        }else{
          this.articles = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  loadReparationsStates(){
    this._reparationStateService.getAll().subscribe({
      next: (response) =>{
        if(response.error){
          console.log("error al obtener los estados de las reparaciones");
        }else{
          this.reparationsStates = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  loadClients(){
    this._userService.getUsers(this._storageService.getTokenValue()).subscribe({
      next: (response) =>{
        if(response.error){
          console.log("error al obtener los usuarios");
        }else{
          this.clients = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addArticleReparation(form: any) {
    var reparationArticle = new ReparationArticleCreation(this.reparationArticle.articleId, this.reparationArticle.articleQuantity);
    this.reparation.reparationsArticles.push(reparationArticle);
    
    var articleName="";
    //buscar el articulo para extraer el nombre
    for(let article of this.articles){
      if(article.id == this.reparationArticle.articleId)
        articleName = article.name;
    }
    var article = new ReparationArticleAdded(articleName, this.reparationArticle.articleQuantity)
    this.articlesAdded.push(article);
    form.reset();
  }
}
