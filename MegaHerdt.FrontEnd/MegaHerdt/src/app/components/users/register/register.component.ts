import { Component, OnInit } from '@angular/core';
import { UserCreate } from '../../../models/User/UserCreate';
import { PhoneCreation } from '../../../models/Phone/PhoneCreation';
import { AddressCreation } from 'src/app/models/Address/AddressCreation';
import { UserService } from 'src/app/services/users/user.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogRegisterSuccessComponent } from './dialog-register-success/dialog-register-success.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserCreate;
  statusSubmit: String;
  addressOk: boolean = true;
  phoneOk: boolean = true;
  error: string = '';

  constructor(private _userService: UserService, private _router: Router,
    private _storageService: StorageService, public dialog: MatDialog) {
    this.user = new UserCreate('', '', '', '', '', new Array<PhoneCreation>(), new Array<AddressCreation>());
    this.user.addresses.push(new AddressCreation('', 0, '', 0, '', '', ''));
    this.user.phones.push(new PhoneCreation(''));
    this.statusSubmit = "";
  }

  ngOnInit(): void {
  }

  isValidAddress(): boolean {
    let address = this.user.addresses[0];
    return address.department !== '' && address.postalCode !== 0 && address.streetName !== '' &&
      address.streetNumber !== 0 && address.townName !== '';
  }

  isValidPhone(): boolean{
    return this.user.phones[0].number != '';
  }

  onSubmit(form: any) {
    this.addressOk = this.isValidAddress();
    this.phoneOk = this.isValidPhone();
    if (this.addressOk && this.phoneOk) {
      this.user.userName = this.user.email;
      this._userService.register(this.user).subscribe(
        {
          next: (response) => {
            if (response.error) {
              this.statusSubmit = "failed";
            } else {
              this.statusSubmit = "success";
              this.openDialogRegisterSuccess();
              form.reset();
            }
          },
          error: (err) => {
            this.statusSubmit = "failed";
            this.error = err.error.message;
            console.log(err)
          }
        }
      );
    }
  }

  openDialogRegisterSuccess(){
    const dialogRef = this.dialog.open(DialogRegisterSuccessComponent,
      {
        disableClose:true,
      });
  }

  authenticated(): boolean {
    return this._storageService.isAuthenticated();
  }
}
