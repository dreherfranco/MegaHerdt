import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { BillTypeEnum } from 'src/app/utils/BillTypeEnum';

@Component({
  selector: 'app-update-reparation-state-reparado',
  templateUrl: './update-reparation-state-reparado.component.html',
  styleUrls: ['./update-reparation-state-reparado.component.css']
})
export class UpdateReparationStateREPARADOComponent implements OnInit {
  paginate: Paginate;
  billTypes = BillTypeEnum;
  constructor(public dialogRef: MatDialogRef<UpdateReparationStateREPARADOComponent>,
    @Inject(MAT_DIALOG_DATA) public reparation: Reparation) { 
    this.paginate = new Paginate(1,2);
  }

  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close(this.reparation);
  }

  closeModal(){
    this.dialogRef.close();
  }

}