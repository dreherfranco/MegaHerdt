import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/models/Article/Article';
import { ArticleUpdateImage } from 'src/app/models/Article/ArticleUpdateImage';
import { Brand } from 'src/app/models/ArticleBrand/Brand';
import { Category } from 'src/app/models/ArticleCategory/Category';
import { ArticleService } from 'src/app/services/articles/article.service';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { changeImage } from 'src/app/utils/errorImage';
import { ArticleWithSerialNumbers } from 'src/app/models/Article/ArticleWithSerialNumbers';
import { structuredClone } from 'src/app/utils/StructuredClone';
import { ArticleUpdate } from 'src/app/models/Article/ArticleUpdate';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
})
export class EditArticleComponent implements OnInit {
  @Input() article!: Article; articleAux!: Article;
  @ViewChild('buttonX') buttonX!: ElementRef;
  categories: Array<Category>;
  brands: Array<Brand>;
  image: File;
  changeImage = changeImage;

  articleWithSerialNumbers: ArticleWithSerialNumbers = new ArticleWithSerialNumbers();

  constructor(
    private _categoryService: CategoryService,
    private _brandService: BrandService,
    private _articleService: ArticleService,
    public dialog: MatDialog
  ) {
    this.categories = new Array<Category>();
    this.brands = new Array<Brand>();
    this.image = new File(new Array(), '');
  }

  loadCategories() {
    this._categoryService.getAll().subscribe({
      next: (response) => {
        if (response.error) {
          console.log('no se pudieron cargar las categorias');
        } else {
          this.categories = response;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadBrands() {
    this._brandService.getAll().subscribe({
      next: (response) => {
        if (response.error) {
          console.log('no se pudieron cargar las categorias');
        } else {
          this.brands = response;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // Ver la forma de ejecutarlo cuando se manda el update
  onChange(fileInput: any) {
    this.image = <File>fileInput.target.files[0];
    var articleImage = new ArticleUpdateImage(this.article.id, this.image);
    this._articleService.sendFormData(articleImage, 'update-image');
  }

  openDialogUpdate() {
    AlertService.warningAlert('¿Estas seguro que quieres actualizar el artículo?', "¡No podrás revertir esto!")
    .then((result) => (result.isConfirmed) ? this.update() : AlertService.errorAlert );
  }

  update() {
    var article = this.mapperArticle();
    this._articleService.sendFormData(article, 'update').subscribe({
      next: (response) => {
        AlertService.successAlert('¡Actualizado!',"El articulo ha sido actualizado.")
        this._articleService.getByName(response.name).subscribe({
          next: (value) => {
            console.log(JSON.stringify(value))
            this.articleAux = value;
            this.copyData();
          },
          error(err) {
            console.log(err.error);
            AlertService.errorAlert('Error al querer actualizar el artículo!')
          },
      });
      },
      error: (err) => {
        console.log(err.error);
        AlertService.errorAlert('Error al querer actualizar el artículo!')
      },
      complete: () => {
        // Cerrar la modal.
        const modalElement = document.querySelector('.modal');
        if (modalElement) {
          modalElement.classList.remove('show');
          const modalBackdrop = document.querySelector('.modal-backdrop');
          if (modalBackdrop) 
            modalBackdrop.remove();
          
        }        
      }
    });
  }

  // Copio la nueva informacion
  copyData(): void{
    this.article.id = this.articleAux.id,
    this.article.name = this.articleAux.name,
    this.article.code = this.articleAux.code,
    this.article.stock = this.articleAux.stock,
    this.article.unitValue = this.articleAux.unitValue,
    this.article.brand = this.articleAux.brand,
    this.article.category = this.articleAux.category
  }

  mapperArticle(): ArticleUpdate {
    return new ArticleUpdate(
      this.articleAux.id,
      this.articleAux.name,
      this.articleAux.code,
      this.articleAux.stock,
      this.articleAux.unitValue,
      this.articleAux.brand.id,
      this.articleAux.category.id,
      this.articleAux.hasSerialNumber
    );
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();

    //Clono el articulo, para q no me lo cambie en la pantalla de atras y por si cancela.
    this.articleAux = structuredClone(this.article);


    console.log("article=> " + JSON.stringify(this.article) + '\n' + "aux=> " + JSON.stringify(this.articleAux));
    // this._articleService.getArticleWithSerialNumbers(this.article.id).subscribe({
    //   next: (response) => {
    //     if (response.error) {

    //       AlertService.errorAlert('¡Error al querer actualizar el artículo!');
    //     } else
    //      {
    //       /** ACA ESTA LA RESPUESTA DEL BACKEND QUE TENES QUE VER */
    //        console.log('response: ', response);
    //        this.articleWithSerialNumbers = response;
    //        console.log('articleWithSerialNumbers: ', this.articleWithSerialNumbers);
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     AlertService.errorAlert('Error al querer actualizar el artículo!');
    //   }
    // });
  }
}
