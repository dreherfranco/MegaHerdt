import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackupService } from 'src/app/services/backup/backup.service';

@Component({
  selector: 'app-backup-restore',
  templateUrl: './backup-restore.component.html',
  styleUrls: ['./backup-restore.component.css']
})
export class BackupRestoreComponent implements OnInit {
  selectedFile: File | null = null;

  constructor(public dialogRef: MatDialogRef<BackupRestoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _backupService: BackupService) { }
    
  ngOnInit(): void {
    console.log(this.data);
  }

  confirm(){
    this.dialogRef.close(this.data);
  }

  closeModal(){
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(){
    if(this.selectedFile === null) return;

    this._backupService.restoreSendFormData(this.selectedFile).subscribe({
      next: res => {
         console.log("Restauración satisfactoria");
    
      }
    })
  }

}
