import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/models/Article/Article';
import { ArticleUpdateImage } from 'src/app/models/Article/ArticleUpdateImage';
import { Brand } from 'src/app/models/ArticleBrand/Brand';
import { Category } from 'src/app/models/ArticleCategory/Category';
import { ArticleOfferDetail } from 'src/app/models/ArticleOffer/ArticleOfferDetail';
import { ArticleService } from 'src/app/services/articles/article.service';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { changeImage } from 'src/app/utils/errorImage';
import { instanceArticle } from 'src/app/utils/instanceArticle';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
})
export class EditArticleComponent implements OnInit {
  @Input() article: Article;
  @ViewChild('buttonX') buttonX!: ElementRef;
  categories: Array<Category>;
  brands: Array<Brand>;
  image: File;
  changeImage = changeImage;

  constructor(
    private _categoryService: CategoryService,
    private _brandService: BrandService,
    private _articleService: ArticleService,
    public dialog: MatDialog
  ) {
    this.article = instanceArticle();
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
    this._articleService.sendFormData(this.article, 'update').subscribe({
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
      complete: () => this.buttonX.nativeElement.setAttribute('data-bs-dismiss', 'modal')      
    });

    setTimeout(() => {
        this._articleService.getByName(this.article.name).subscribe({
          next: (res) => (this.article.code = res.code),
        });
      }, 1000);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
  }
}
