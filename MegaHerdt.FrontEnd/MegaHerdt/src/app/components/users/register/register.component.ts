import { Component, OnInit } from '@angular/core';
import { UserCreate } from '../../../models/User/UserCreate';
import { PhoneCreation } from '../../../models/Phone/PhoneCreation';
import { AddressCreation } from 'src/app/models/Address/AddressCreation';
import { UserService } from 'src/app/services/users/user.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

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

  constructor(private _userService: UserService, private _router: Router,
    private _storageService: StorageService) {
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
      this._userService.register(this.user).subscribe(
        {
          next: (response) => {
            if (response.error) {
              this.statusSubmit = "failed";
            } else {
              this.statusSubmit = "success";
              this._router.navigate(['login']);
            }
          },
          error: (err) => {
            this.statusSubmit = "failed";
            console.log(err)
          }
        }
      );
    }
  }

  authenticated(): boolean {
    return this._storageService.isAuthenticated();
  }
}
