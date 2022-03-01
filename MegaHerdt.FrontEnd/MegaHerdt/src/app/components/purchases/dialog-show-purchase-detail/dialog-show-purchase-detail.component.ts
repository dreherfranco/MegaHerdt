import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Purchase } from 'src/app/models/Purchase/Purchase';

@Component({
  selector: 'app-dialog-show-purchase-detail',
  templateUrl: './dialog-show-purchase-detail.component.html',
  styleUrls: ['./dialog-show-purchase-detail.component.css']
})
export class DialogShowPurchaseDetailComponent implements OnInit {
  total: number = 0;
  constructor(public dialogRef: MatDialogRef<DialogShowPurchaseDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Purchase) { 
      this.dialogRef.disableClose = false;
    }

  ngOnInit(): void {
    this.getTotal();
  }

  closeModal(){
    this.dialogRef.close();
  }

  getTotal(){
    this.data.purchasesArticles.forEach((x)=>{
      this.total += x.articlePriceAtTheMoment;
    })
  }
}
