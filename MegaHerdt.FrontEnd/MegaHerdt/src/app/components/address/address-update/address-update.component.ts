import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { AddressUpdate } from 'src/app/models/Address/AddressUpdate';

@Component({
  selector: 'app-address-update',
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.css']
})
export class AddressUpdateComponent implements OnInit {

  @Input() address: AddressUpdate;
  addressStatus: string;

  constructor() {
    this.address = new AddressUpdate(0,'',0,'',0,'','','');
    this.addressStatus="";
   }

  ngOnInit(): void {
  }


}
