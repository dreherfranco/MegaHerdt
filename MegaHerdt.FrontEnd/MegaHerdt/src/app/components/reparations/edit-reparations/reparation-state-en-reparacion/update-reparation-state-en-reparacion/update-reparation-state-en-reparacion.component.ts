import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reparation } from 'src/app/models/Reparation/Reparation';

@Component({
  selector: 'app-update-reparation-state-en-reparacion',
  templateUrl: './update-reparation-state-en-reparacion.component.html',
  styleUrls: ['./update-reparation-state-en-reparacion.component.css']
})
export class UpdateReparationStateENREPARACIONComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<UpdateReparationStateENREPARACIONComponent>,
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
