import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackupService } from 'src/app/services/backup/backup.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { RoleEnum as Role} from 'src/app/utils/RoleEnum';
import { DialogDownloadBackupComponent } from '../../backup/dialog-download-backup/dialog-download-backup.component';

@Component({
  selector: 'app-administrate',
  templateUrl: './administrate.component.html',
  styleUrls: ['./administrate.component.css']
})
export class AdministrateComponent implements OnInit {

  constructor(private _storageService: StorageService, 
    public dialog: MatDialog, private _backupService: BackupService) { }

  ngOnInit(): void {
  }
  
  isAdmin(): boolean{
    let expectedsRoles = new Array<string>();
    expectedsRoles.push(Role.ADMIN);
    return this._storageService.areExpectedRoles(expectedsRoles);
  }

  isEmployeeOrAdmin(): boolean{
    let expectedsRoles = new Array<string>();
    expectedsRoles.push(Role.ADMIN, Role.EMPLEADO);
    return this._storageService.areExpectedRoles(expectedsRoles);
  }

  openDialogBackup(){
    this._backupService.getBackup(this._storageService.getTokenValue()).subscribe({
      next: res => {
          this.dialog.open(DialogDownloadBackupComponent,
          {
            disableClose:true,
            data: res
          });
    
      }
    })
      
    
  }
}
