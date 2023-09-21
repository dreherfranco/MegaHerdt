import { Component, OnInit } from '@angular/core';
import { CategoryCreation } from 'src/app/models/ArticleCategory/CategoryCreation';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { CategoryService } from 'src/app/services/category/category.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  category: CategoryCreation;

  constructor(private _storageService: StorageService, private _categoryService: CategoryService) {
    this.category = new CategoryCreation("");
  }

  ngOnInit(): void {
  }


  onSubmit(form: any){
  this._categoryService.create(this.category, this._storageService.getTokenValue()).subscribe(
      {
        next: (response) => {
          if (response.error) {
            AlertService.errorAlert('¡Error al intentar crear la Categoria!');
          } else {
            this._categoryService.updateCategories();
            AlertService.successAlert('Categoria creada correctamente!').then((result) => {
              if (result.isConfirmed) {     
                  // Limpia el formulario.           
                  form.reset();
              }
            });
          }
        },
        error: (err) => {
          AlertService.errorAlert('¡Error al intentar crear la Categoria!');

          console.log(err)
        }
      }
    );
  }
}
