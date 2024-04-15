import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Purchase } from 'src/app/models/Purchase/Purchase';
import { BillTypeEnum } from 'src/app/utils/BillTypeEnum';

@Component({
  selector: 'app-reserved-state-dialog',
  templateUrl: './reserved-state-dialog.component.html',
  styleUrls: ['./reserved-state-dialog.component.css']
})
export class ReservedStateDialogComponent implements OnInit {
  total: number = 0;
  billTypes = BillTypeEnum;
  
  constructor(public dialogRef: MatDialogRef<ReservedStateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public purchase: Purchase) 
    {
    }

  ngOnInit(): void {
    this.purchase.purchasesArticles.forEach((pa) => {
      this.total += pa.articleQuantity * pa.articlePriceAtTheMoment;
    });
  }

  confirm(){
    this.dialogRef.close(this.purchase);
  }

  closeModal(){
    this.dialogRef.close();
  }
}
