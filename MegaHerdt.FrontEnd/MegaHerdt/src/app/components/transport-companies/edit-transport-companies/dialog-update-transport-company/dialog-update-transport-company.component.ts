import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransportCompany } from 'src/app/models/TransportCompany/TransportCompany';

@Component({
  selector: 'app-dialog-update-transport-company',
  templateUrl: './dialog-update-transport-company.component.html',
  styleUrls: ['./dialog-update-transport-company.component.css']
})
export class DialogUpdateTransportCompanyComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<DialogUpdateTransportCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransportCompany) { }

  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close(this.data);
  }

  closeModal(){
    this.dialogRef.close();
  }

}
