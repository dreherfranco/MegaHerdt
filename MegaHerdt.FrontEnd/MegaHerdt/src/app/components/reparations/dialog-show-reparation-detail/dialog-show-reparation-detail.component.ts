import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { MethodOfPayment } from 'src/app/utils/MethodOfPayment';

@Component({
  selector: 'app-dialog-show-reparation-detail',
  templateUrl: './dialog-show-reparation-detail.component.html',
  styleUrls: ['./dialog-show-reparation-detail.component.css']
})
export class DialogShowReparationDetailComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogShowReparationDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reparation) { 
      this.dialogRef.disableClose = false;
    }

  ngOnInit(): void {
  }

  closeModal(){
    this.dialogRef.close();
  }

  getPaymentMethod(methodOfPayment: MethodOfPayment | null | undefined)
  {
    if(methodOfPayment === null || methodOfPayment === undefined) return '';
    switch(methodOfPayment)
    {
      case MethodOfPayment.Cash:
        return "Efectivo";
      case MethodOfPayment.Credit:
        return "Credito";
      case MethodOfPayment.Debit:
        return "Debito";
      default:
          return "Efectivo";
    }
  }
}
