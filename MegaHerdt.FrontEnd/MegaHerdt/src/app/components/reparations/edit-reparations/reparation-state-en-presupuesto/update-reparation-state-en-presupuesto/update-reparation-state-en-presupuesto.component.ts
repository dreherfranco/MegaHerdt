import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReparationUpdateBudget } from 'src/app/models/Reparation/ReparationUpdateBudget';

@Component({
  selector: 'app-update-reparation-state-en-presupuesto',
  templateUrl: './update-reparation-state-en-presupuesto.component.html',
  styleUrls: ['./update-reparation-state-en-presupuesto.component.css']
})
export class UpdateReparationStateENPRESUPUESTOComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<UpdateReparationStateENPRESUPUESTOComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReparationUpdateBudget) { }

  ngOnInit(): void {
  }

  confirm(){
    this.data.isAccepted = true;
    this.dialogRef.close(this.data);
  }

  closeModal(){
    this.dialogRef.close();
  }
}
