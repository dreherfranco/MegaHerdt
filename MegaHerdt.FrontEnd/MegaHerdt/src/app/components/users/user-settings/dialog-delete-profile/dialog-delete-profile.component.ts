import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-profile',
  templateUrl: './dialog-delete-profile.component.html',
  styleUrls: ['./dialog-delete-profile.component.css']
})
export class DialogDeleteProfileComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }


  confirm(){
    this.dialogRef.close(this.data);
  }

  closeModal(){
    this.dialogRef.close();
  }
}
