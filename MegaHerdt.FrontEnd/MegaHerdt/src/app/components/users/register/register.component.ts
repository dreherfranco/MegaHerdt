import { Component, OnInit } from '@angular/core';
import { UserCreate } from '../../../models/User/UserCreate';
import { PhoneCreation } from '../../../models/Phone/PhoneCreation';
import { AddressCreation } from 'src/app/models/Address/AddressCreation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserCreate;
  status: String;
  phoneNumber: string;
  addressAddOk: boolean;
  phonesAddOk: boolean;

  constructor() {
    this.user = new UserCreate('', '', '', '', new Array<PhoneCreation>(), new Array<AddressCreation>());
    this.status = "";
    this.phoneNumber = "";
    this.addressAddOk = false;
    this.phonesAddOk = false;
  }

  ngOnInit(): void {

  }

  onSubmit(registerForm: any) {
    console.log(this.user);
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
}
