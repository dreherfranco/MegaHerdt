import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/ArticleCategory/Category';
import { CategoryService } from 'src/app/services/category/category.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateCategoryComponent } from './dialog-update-category/dialog-update-category.component';
import { DialogConfirmDeleteComponent } from '../../general/dialog-confirm-delete/dialog-confirm-delete.component';

import { PDFGenerator } from 'src/app/utils/PDFGenerator';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { AlertService } from 'src/app/services/Alerts/AlertService';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css']
})
export class EditCategoriesComponent implements OnInit {
  categories: Array<Category>;
  @ViewChild('content', { static: true }) content!: ElementRef;
  paginate: Paginate;
  searchText: string = '';
  
  constructor(private _storageService: StorageService, private _categoryService: CategoryService,public dialog: MatDialog) {
    this.categories = new Array<Category>();
    this.paginate = new Paginate(1,6);
  }


  ngOnInit(): void {
    this.loadCategories();
  }

  openDialogUpdate(category: Category) {
    AlertService.warningAlert(
      '¿Estas seguro que quiere actualizar esta Categoria?', 
      '¡No podrás revertir esto!')
    .then((result) => {
      if (result.isConfirmed) {     
          this.updateCategory(category);
      }
    });
  }
  
  loadCategories(){
    this._categoryService.categories.subscribe({
      next: res => this.categories = res 
    });
  }

  openDialogDelete(categoryId: number) {
    AlertService.warningAlert(
      '¿Estas seguro que quiere eliminar esta Categoria?', 
      '¡No podrás revertir esto!')
    .then((result) => {
      if (result.isConfirmed) {     
          this.deleteCategory(categoryId);
      }
    });
  }

  deleteCategory(id: number){
    this._categoryService.delete(id, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
            AlertService.errorAlert('¡Error al intentar eliminar la Categoria!');
          } else {
            this._categoryService.updateCategories();
            AlertService.successAlert('¡Eliminada!','Categoria eliminada correctamente');
          }
        },
        error: (err) => {
          AlertService.errorAlert('¡Error al intentar eliminar la Categoria!');
          console.log(err)
        }
    }
    );
  }

  updateCategory(category: Category){
    this._categoryService.update(category, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
            AlertService.errorAlert('¡Error al intentar actualizar la Categoria!');
          } else {
            AlertService.successAlert('¡Actualizada!','Categoria actualizada correctamente');
          }
        },
        error: (err) => {
          AlertService.errorAlert('¡Error al intentar actualizar la Categoria!');
          console.log(err)
        }
    }
    );
  }

  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }

  generatePDF() {
    PDFGenerator.generatePDF(this.content);
  }
}
