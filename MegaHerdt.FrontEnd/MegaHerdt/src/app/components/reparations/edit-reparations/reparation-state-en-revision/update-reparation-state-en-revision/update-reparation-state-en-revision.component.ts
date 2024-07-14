import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ReparationArticle } from 'src/app/models/Article/ReparationArticle';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ArticleService } from 'src/app/services/articles/article.service';
import { DialogAddReparationArticlesComponent } from '../dialog-add-reparation-articles/dialog-add-reparation-articles.component';
import { AlertService } from 'src/app/services/Alerts/AlertService';

@Component({
  selector: 'app-update-reparation-state-en-revision',
  templateUrl: './update-reparation-state-en-revision.component.html',
  styleUrls: ['./update-reparation-state-en-revision.component.css']
})
export class UpdateReparationStateENREVISIONComponent implements OnInit {
  articles: Array<ArticleName>;
  reparationArticle: ReparationArticle;
  paginate: Paginate;

  constructor(private _articleService: ArticleService,
    public dialogRef: MatDialogRef<UpdateReparationStateENREVISIONComponent>,
    @Inject(MAT_DIALOG_DATA) public reparation: Reparation,
    public dialog: MatDialog) 
  { 
    //this.reparation.reparationsArticles = [];
    this.articles = new Array<ArticleName>();
    this.reparationArticle = new ReparationArticle(0,1,0,"");
    this.paginate = new Paginate(1,2);
  }

  ngOnInit(): void {
    this.loadArticles();
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
          this.articles = this.articles.filter(x => x.stock > 0);
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
      {
        articleName = article.name;
        var reparationArticle = new ReparationArticle(this.reparationArticle.articleId, this.reparationArticle.articleQuantity,0,articleName);
        this.reparation.reparationsArticles.push(reparationArticle);
      }
    }
    
  }

  openDialog()
  {
    const dialogRef = this.dialog.open(DialogAddReparationArticlesComponent, {
      data: 
      {
        reparationArticle: null, // Pasar la copia del objeto al diálogo
        articlesUsedIds: this.getArticlesUsedIds(null), // Pasar los IDs de los artículos usados // Pasar la copia del objeto al diálogo
       },      
      width: '48%',
      panelClass: 'custom-dialog-container'
    });
    

    dialogRef.afterClosed().subscribe((result: ReparationArticle) => {
      if(result != undefined){
        this.reparation.reparationsArticles.push(result);
      }
    });
  }

  /**
   * Devuelve los ids de los articulos que serán utilizadas en la reparacion.
   * articleActualId: Indica en la edición el articulo que se va a editar para que no filtre de los articulos
   */
  getArticlesUsedIds(articleActualId: number | null )
  {
    var articlesUsedIds = new Array<Number>();
    for(let ra  of this.reparation.reparationsArticles)
    {
      if(articleActualId === null)
      {
        articlesUsedIds.push(ra.articleId);
      }
      else if(articleActualId !== null && articleActualId !== ra.articleId)
      {
        articlesUsedIds.push(ra.articleId);
      }
    }
    return articlesUsedIds;
  }

  editReparationArticle(item: ReparationArticle){     
    // Crear una copia del objeto antes de abrir el diálogo
    const itemCopy = { ...item };

    const dialogRef = this.dialog.open(DialogAddReparationArticlesComponent,
      { 
       // articlesUsedIds,
        data: 
        {
          reparationArticle: itemCopy, // Pasar la copia del objeto al diálogo
          articlesUsedIds: this.getArticlesUsedIds(item.articleId), // Pasar los IDs de los artículos usados // Pasar la copia del objeto al diálogo
         },
        height: '700px',
        width: '700px'
      });

    dialogRef.afterClosed().subscribe((result: ReparationArticle) => {
      if(result != undefined){
        // Buscar el ítem existente y actualizarlo
        const index = this.reparation.reparationsArticles.findIndex(x => x.articleId === result.articleId);
        if (index !== -1) {
          this.reparation.reparationsArticles[index] = result;
        }
      }
    });
    
  }

  removeReparationArticle(item: ReparationArticle)
  {     
    AlertService.warningAlert('¿Seguro que quieres remover este artículo?')
    .then((result) => {
      if (result.isConfirmed) {     
        // Buscar el ítem existente y actualizarlo
        const index = this.reparation.reparationsArticles.findIndex(x => x.articleId === item.articleId);
        if (index !== -1) 
        {
          this.reparation.reparationsArticles.splice(index, 1);
        }
      }
    });
  }
}
