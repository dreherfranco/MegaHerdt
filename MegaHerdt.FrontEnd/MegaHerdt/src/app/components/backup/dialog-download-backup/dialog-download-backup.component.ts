import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackupZips } from 'src/app/models/Backup/BackupZips';

@Component({
  selector: 'app-dialog-download-backup',
  templateUrl: './dialog-download-backup.component.html',
  styleUrls: ['./dialog-download-backup.component.css']
})
export class DialogDownloadBackupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogDownloadBackupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BackupZips) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  confirm(){
    this.dialogRef.close(this.data);
  }

  closeModal(){
    this.dialogRef.close();
  }

}
