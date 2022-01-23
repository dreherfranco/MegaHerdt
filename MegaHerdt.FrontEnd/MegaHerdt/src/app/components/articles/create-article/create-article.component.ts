import { Component, OnInit } from '@angular/core';
import { ArticleCreation } from 'src/app/models/Article/ArticleCreation';
import { Brand } from 'src/app/models/ArticleBrand/Brand';
import { Category } from 'src/app/models/ArticleCategory/Category';
import { ArticleService } from 'src/app/services/articles/article.service';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  article: ArticleCreation;
  statusSubmit: string;
  categories: Array<Category>;
  brands: Array<Brand>;
  categoryId: number;
  brandId: number;

  constructor(private _storageService: StorageService, private _articleService: ArticleService,
    private _categoryService: CategoryService, private _brandService: BrandService) {
    this.article = new ArticleCreation("", "", new File(new Array, ''), 0, 0, 0, 0);
    this.statusSubmit = "";
    this.categories = new Array<Category>();
    this.categoryId = 0;
    this.brands = new Array<Brand>();
    this.brandId = 0;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
  }

  onSubmit(form: any) {
    this.article.categoryId = this.categoryId;
    this.article.brandId = this.brandId;
    this._articleService.create(this.article, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se pudieron cargar las categorias");
          this.statusSubmit = "failed";
        } else {
          this.statusSubmit = "success";
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
    
  }

  loadCategories() {
    this._categoryService.getAll().subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se pudieron cargar las categorias");
        } else {
          this.categories = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  loadBrands(){
    this._brandService.getAll().subscribe({
        next: (response) => {
          if (response.error) {
              console.log("no se pudieron cargar las categorias");
          } else {
            this.brands = response;
          }
        },
        error: (err) => {
          this.statusSubmit = "failed";
          console.log(err)
        }
    });
  }

  onChange(fileInput: any){
    this.article.image = <File>fileInput.target.files[0]
  }
}
