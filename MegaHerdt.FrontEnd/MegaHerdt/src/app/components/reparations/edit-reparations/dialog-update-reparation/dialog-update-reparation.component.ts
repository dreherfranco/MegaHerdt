import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reparation } from 'src/app/models/Reparation/Reparation';

@Component({
  selector: 'app-dialog-update-reparation',
  templateUrl: './dialog-update-reparation.component.html',
  styleUrls: ['./dialog-update-reparation.component.css']
})
export class DialogUpdateReparationComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogUpdateReparationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reparation) { }

  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close(this.data);
  }

  closeModal(){
    this.dialogRef.close();
  }


}
