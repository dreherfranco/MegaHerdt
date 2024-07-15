import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ReparationArticleSerialNumber } from 'src/app/models/Article/ReparationArticleSerialNumber';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { MethodOfPayment } from 'src/app/utils/MethodOfPayment';
import { DialogShowSerialNumbersComponent } from '../../articles-provisions/dialog-show-serial-numbers/dialog-show-serial-numbers.component';

@Component({
  selector: 'app-dialog-show-reparation-detail',
  templateUrl: './dialog-show-reparation-detail.component.html',
  styleUrls: ['./dialog-show-reparation-detail.component.css']
})
export class DialogShowReparationDetailComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogShowReparationDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reparation,  public dialog: MatDialog) { 
      this.dialogRef.disableClose = false;
    }

  ngOnInit(): void {
  }

  closeModal(){
    this.dialogRef.close();
  }

  showSerialNumbers(serialNumbers: ReparationArticleSerialNumber[]){     
    const dialogRef = this.dialog.open(DialogShowSerialNumbersComponent,
      {
        data: serialNumbers,
        height: '300px',
        width: '300px'
      });

    dialogRef.afterClosed().subscribe((result: any) => {
      /**logica para aplicar luego de cerrar el dialogo */
    });
  }

  getPaymentMethod(methodOfPayment: MethodOfPayment | null | undefined): string {
    console.log("payment method", methodOfPayment);
    if (methodOfPayment === null || methodOfPayment === undefined) return 'Desconocido';
    switch (methodOfPayment) {
      case MethodOfPayment.Cash:
        return "Efectivo";
      case MethodOfPayment.Credit:
        return "Credito";
      case MethodOfPayment.Debit:
        return "Debito";
      default:
        return "Desconocido";
    }
  }
}
