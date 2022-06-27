import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';
import { DialogDeleteProfileComponent } from './dialog-delete-profile/dialog-delete-profile.component';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  constructor(public dialog: MatDialog, private _storageService: StorageService,
    private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }
  openDialogDeleteProfile(){
    var identity: UserDetail = this._storageService.getIdentity();

    const dialogRef = this.dialog.open(DialogDeleteProfileComponent,
      {
        disableClose:true,
        data: identity.userName
      });

    dialogRef.afterClosed().subscribe((result: string) => {
      if(result != undefined){
        this.deleteProfile(result);
      }
    });
  }

  deleteProfile(userName: string){
    this._userService.delete(userName, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
            console.log("no se pudo eliminar el perfil");
        } else {
          this._storageService.logout();
          this._router.navigate(['']);
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
