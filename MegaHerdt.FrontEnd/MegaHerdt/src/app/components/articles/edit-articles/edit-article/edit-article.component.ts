import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDeleteComponent } from 'src/app/components/general/dialog-confirm-delete/dialog-confirm-delete.component';
import { Article } from 'src/app/models/Article/Article';
import { ArticleUpdate } from 'src/app/models/Article/ArticleUpdate';
import { ArticleUpdateImage } from 'src/app/models/Article/ArticleUpdateImage';
import { Brand } from 'src/app/models/ArticleBrand/Brand';
import { Category } from 'src/app/models/ArticleCategory/Category';
import { ArticleOfferDetail } from 'src/app/models/ArticleOffer/ArticleOfferDetail';
import { ArticleService } from 'src/app/services/articles/article.service';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogUpdateArticleComponent } from '../dialog-update-article/dialog-update-article.component';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/services/Alerts/AlertService';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
})
export class EditArticleComponent implements OnInit {
  @Input() article: Article;
  categories: Array<Category>;
  brands: Array<Brand>;
  image: File;
  constructor(
    private _categoryService: CategoryService,
    private _brandService: BrandService,
    private _articleService: ArticleService,
    private _storageService: StorageService,
    public dialog: MatDialog
  ) {
    this.article = this.instanceArticle();
    this.categories = new Array<Category>();
    this.brands = new Array<Brand>();
    this.image = new File(new Array(), '');
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
  }

  private instanceArticle(): Article {
    let brand = new Brand(0, '');
    let category = new Category(0, '');
    let offers = new Array<ArticleOfferDetail>();
    let article = new Article(
      0,
      '',
      '',
      0,
      '',
      0,
      0,
      brand,
      category,
      offers,
      offers
    );
    return article;
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

  onChange(fileInput: any) {
    this.image = <File>fileInput.target.files[0];
    var articleImage = new ArticleUpdateImage(this.article.id, this.image);
    this._articleService.sendFormData(articleImage, 'update-image');
  }

  openDialogUpdate() {
    

    AlertService.warningAlert('¿Estas por actualizar un artículo?', "¡No podrás revertir esto!")
    .then((result) => {
      if (result.isConfirmed) {
        this.update();
      }
    })

  }

  update() {
    var article = this.mapperArticle();
    this._articleService.sendFormData(article, 'update').subscribe({
      next: (response) => {
        if (response.error) {

          AlertService.errorAlert('¡Error al querer actualizar el artículo!');
        } else {
          AlertService.successAlert('¡Actualizado!',"El articulo ha sido actualizado.")
            .then((result)=>
            {
              // Si fue exitoso se recarga la pagina
              window.location.reload();
            })
        }
      },
      error: (err) => {
        console.log(err);
        AlertService.errorAlert('Error al querer actualizar el artículo!');
      },
    });

    setTimeout(() => {
      this._articleService.getByName(article.name).subscribe({
        next: (res) => (this.article.code = res.code),
      });
    }, 1000);
  }

  openDialogDelete() {
    AlertService.warningAlert('¿Estas por borrar un artículo?', "¡No podrás revertir esto!")
    .then((result) => {
      if (result.isConfirmed) {
        this.delete();
      }
    })

  }

  delete() {
    console.log(this._articleService)
    this._articleService
      .delete(this.article.id, this._storageService.getTokenValue())
      .subscribe({
        next: (response) => {
          if (response.error) {

            AlertService.errorAlert('Error al querer eliminar el artículo!')

          } else {
            //window.location.reload();
            AlertService.successAlert('¡Eliminado!',"El articulo ha sido eliminado.")
            .then((result)=>
            {
              // Si fue exitoso se recarga la pagina
              window.location.reload();
            })
          }
        },
        error: (err) => {
          AlertService.errorAlert('Error al querer eliminar el artículo!')
          console.log(err);
        },
      });
  }

  mapperArticle(): ArticleUpdate {
    return new ArticleUpdate(
      this.article.id,
      this.article.name,
      this.article.code,
      this.article.stock,
      this.article.unitValue,
      this.article.brand.id,
      this.article.category.id
    );
  }
}
