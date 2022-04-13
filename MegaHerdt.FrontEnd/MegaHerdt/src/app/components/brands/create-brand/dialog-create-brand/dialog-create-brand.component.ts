import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/models/Article/Article';

@Component({
  selector: 'app-dialog-create-brand',
  templateUrl: './dialog-create-brand.component.html',
  styleUrls: ['./dialog-create-brand.component.css']
})
export class DialogCreateBrandComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogCreateBrandComponent>,
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
