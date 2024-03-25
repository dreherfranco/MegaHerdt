import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleProviderSerialNumber } from 'src/app/models/ArticleProviderSerialNumber/ArticleProviderSerialNumber';

@Component({
  selector: 'app-dialog-show-serial-numbers',
  templateUrl: './dialog-show-serial-numbers.component.html',
  styleUrls: ['./dialog-show-serial-numbers.component.css']
})
export class DialogShowSerialNumbersComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogShowSerialNumbersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArticleProviderSerialNumber[]) { }

  ngOnInit(): void {
  }
  
  closeModal(){
    this.dialogRef.close();
  }

}
