import { Component, Inject, OnInit } from '@angular/core';
import { Category } from 'src/app/models/ArticleCategory/Category';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-update-category',
  templateUrl: './dialog-update-category.component.html',
  styleUrls: ['./dialog-update-category.component.css']
})
export class DialogUpdateCategoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogUpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category) { }

  ngOnInit(): void {
  }


  confirm(){
    this.dialogRef.close(this.data);
  }

  closeModal(){
    this.dialogRef.close();
  }
}
