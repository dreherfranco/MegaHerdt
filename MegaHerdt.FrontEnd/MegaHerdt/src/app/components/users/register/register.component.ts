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
  phoneNumber: string;
  addressAddOk: boolean;
  phonesAddOk: boolean;

  constructor(private _userService: UserService, private _router: Router, 
    private _storageService: StorageService) 
    {
    this.user = new UserCreate('', '', '', '', '', new Array<PhoneCreation>(), new Array<AddressCreation>());
    this.statusSubmit = "";
    this.phoneNumber = "";
    this.addressAddOk = false;
    this.phonesAddOk = false;
  }

  ngOnInit(): void {

  }

  onSubmit(form: any) {
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

  addPhone() {
    var phone = new PhoneCreation(this.phoneNumber);
    this.user.phones.push(phone);
    this.phoneNumber = "";
    this.phonesAddOk = true;
  }

  removePhone(index: number) {
    this.user.phones.splice(index, 1);
  }

  numberEmpty(): boolean {
    return this.phoneNumber == "";
  }

  addAddress(address: AddressCreation) {
    this.user.addresses.push(address);
    this.addressAddOk = true;
  }

  removeAddress(index: number){
    this.user.addresses.splice(index, 1);
  }

  authenticated(): boolean{
    return this._storageService.isAuthenticated();
  }
}
