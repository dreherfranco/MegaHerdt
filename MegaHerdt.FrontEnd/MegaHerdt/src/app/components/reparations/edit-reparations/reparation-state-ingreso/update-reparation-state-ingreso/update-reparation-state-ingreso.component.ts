import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reparation } from 'src/app/models/Reparation/Reparation';

@Component({
  selector: 'app-update-reparation-state-ingreso',
  templateUrl: './update-reparation-state-ingreso.component.html',
  styleUrls: ['./update-reparation-state-ingreso.component.css']
})
export class UpdateReparationStateINGRESOComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateReparationStateINGRESOComponent>,
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
