import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Provider } from 'src/app/models/Provider/Provider';

@Component({
  selector: 'app-dialog-update-provider',
  templateUrl: './dialog-update-provider.component.html',
  styleUrls: ['./dialog-update-provider.component.css']
})
export class DialogUpdateProviderComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogUpdateProviderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Provider) { }

  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close(this.data);
  }

  closeModal(){
    this.dialogRef.close();
  }

}
