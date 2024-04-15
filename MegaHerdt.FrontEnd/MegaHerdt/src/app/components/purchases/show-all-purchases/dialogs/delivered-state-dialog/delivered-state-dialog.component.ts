import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Purchase } from 'src/app/models/Purchase/Purchase';
import { BillTypeEnum } from 'src/app/utils/BillTypeEnum';

@Component({
  selector: 'app-delivered-state-dialog',
  templateUrl: './delivered-state-dialog.component.html',
  styleUrls: ['./delivered-state-dialog.component.css']
})
export class DeliveredStateDialogComponent implements OnInit {
  billTypes = BillTypeEnum;
  
  constructor(public dialogRef: MatDialogRef<DeliveredStateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public purchase: Purchase) 
    {
    }

  ngOnInit(): void {

  }

  confirm(){
    this.dialogRef.close(this.purchase);
  }

  closeModal(){
    this.dialogRef.close();
  }

}
