import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReparationState } from 'src/app/models/ReparationState/ReparationState';

@Component({
  selector: 'app-dialog-update-reparation-state',
  templateUrl: './dialog-update-reparation-state.component.html',
  styleUrls: ['./dialog-update-reparation-state.component.css']
})
export class DialogUpdateReparationStateComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogUpdateReparationStateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReparationState) { }

  ngOnInit(): void {
  }


  confirm(){
    this.dialogRef.close(this.data);
  }

  closeModal(){
    this.dialogRef.close();
  }

}
