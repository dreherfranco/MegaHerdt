import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-register-success',
  templateUrl: './dialog-register-success.component.html',
  styleUrls: ['./dialog-register-success.component.css']
})
export class DialogRegisterSuccessComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogRegisterSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
    }

    closeModal(){
      this.dialogRef.close();
    }
}
