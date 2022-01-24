import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/models/Article/Article';

@Component({
  selector: 'app-dialog-update-article',
  templateUrl: './dialog-update-article.component.html',
  styleUrls: ['./dialog-update-article.component.css']
})
export class DialogUpdateArticleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogUpdateArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Article) { }

  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close(this.data);
  }

  closeModal(){
    this.dialogRef.close();
  }


}
