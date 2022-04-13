import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/ArticleCategory/Category';
import { CategoryService } from 'src/app/services/category/category.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateCategoryComponent } from './dialog-update-category/dialog-update-category.component';
import { DialogConfirmDeleteComponent } from '../../general/dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css']
})
export class EditCategoriesComponent implements OnInit {
  categories: Array<Category>;
  statusSubmit: string;

  constructor(private _storageService: StorageService, private _categoryService: CategoryService,public dialog: MatDialog) {
    this.categories = new Array<Category>();
    this.statusSubmit = "";
  }


  ngOnInit(): void {
    this.loadCategories();
  }

  openDialogUpdate(category: Category) {
    const dialogRef = this.dialog.open(DialogUpdateCategoryComponent,
      {
        disableClose:true,
        data: category
      });

    dialogRef.afterClosed().subscribe((result: Category) => {
      if(result != undefined){
        this.updateCategory(result);
      }
    });
  }
  
  loadCategories(){
    this._categoryService.categories.subscribe({
      next: res => this.categories = res 
    });
  }

  openDialogDelete(categoryId: number) {
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent,
      {
        disableClose:true,
        data: categoryId
      });

    dialogRef.afterClosed().subscribe((result: number) => {
      if(result != undefined){
        this.deleteCategory(result);
      }
    });
  }

  deleteCategory(id: number){
    this._categoryService.delete(id, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
              console.log("no se pudieron cargar las categorias");
          } else {
            this._categoryService.updateCategories();
          }
        },
        error: (err) => {
          this.statusSubmit = "failed";
          console.log(err)
        }
    }
    );
  }

  updateCategory(category: Category){
    this._categoryService.update(category, this._storageService.getTokenValue()).subscribe({
        next: (response) => {
          if (response.error) {
              console.log("no se pudieron cargar las categorias");
          } else {
            this.statusSubmit = "success";
          }
        },
        error: (err) => {
          this.statusSubmit = "failed";
          console.log(err)
        }
    }
    );
  }
}
