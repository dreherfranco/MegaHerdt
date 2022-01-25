import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleProvider } from 'src/app/models/ArticleProvider/ArticleProvider';

@Component({
  selector: 'app-dialog-update-article-provision',
  templateUrl: './dialog-update-article-provision.component.html',
  styleUrls: ['./dialog-update-article-provision.component.css']
})
export class DialogUpdateArticleProvisionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogUpdateArticleProvisionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArticleProvider) { }

  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close(this.data);
  }

  closeModal(){
    this.dialogRef.close();
  }

}
