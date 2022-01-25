import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleOffer } from 'src/app/models/ArticleOffer/ArticleOffer';

@Component({
  selector: 'app-dialog-update-offer',
  templateUrl: './dialog-update-offer.component.html',
  styleUrls: ['./dialog-update-offer.component.css']
})
export class DialogUpdateOfferComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogUpdateOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArticleOffer) { }

  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close(this.data);
  }

  closeModal(){
    this.dialogRef.close();
  }

}
