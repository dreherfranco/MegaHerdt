import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-admin-create-user',
  templateUrl: './dialog-admin-create-user.component.html',
  styleUrls: ['./dialog-admin-create-user.component.css']
})
export class DialogAdminCreateUserComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogAdminCreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.dialogRef.disableClose = false;
    }

  ngOnInit(): void {
  }

  closeModal(){
    this.dialogRef.close();
  }
}
