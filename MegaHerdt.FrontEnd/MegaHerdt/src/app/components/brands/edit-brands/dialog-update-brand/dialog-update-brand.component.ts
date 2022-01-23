import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from 'src/app/models/ArticleBrand/Brand';

@Component({
  selector: 'app-dialog-update-brand',
  templateUrl: './dialog-update-brand.component.html',
  styleUrls: ['./dialog-update-brand.component.css']
})
export class DialogUpdateBrandComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogUpdateBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Brand) { }

  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close(this.data);
  }

  closeModal(){
    this.dialogRef.close();
  }
}
