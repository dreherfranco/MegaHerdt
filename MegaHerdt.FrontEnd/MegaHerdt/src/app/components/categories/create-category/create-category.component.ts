import { Component, OnInit } from '@angular/core';
import { CategoryCreation } from 'src/app/models/ArticleCategory/CategoryCreation';
import { CategoryService } from 'src/app/services/category/category.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  category: CategoryCreation;
  statusSubmit: string;

  constructor(private _storageService: StorageService, private _categoryService: CategoryService) {
    this.category = new CategoryCreation("");
    this.statusSubmit = "";
  }

  ngOnInit(): void {
  }


  onSubmit(form: any){
  this._categoryService.create(this.category, this._storageService.getTokenValue()).subscribe(
      {
        next: (response) => {
          if (response.error) {
            this.statusSubmit = "failed";
          } else {
            this.statusSubmit = "success";
            window.location.reload();
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
