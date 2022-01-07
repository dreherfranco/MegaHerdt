import { Component, OnInit } from '@angular/core';
import { AddressCreation } from 'src/app/models/Address/AddressCreation';
import { Output, EventEmitter } from '@angular/core';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-address-creation',
  templateUrl: './address-creation.component.html',
  styleUrls: ['./address-creation.component.css']
})
export class AddressCreationComponent implements OnInit {
  address: AddressCreation;
  addressStatus: string;
  @Output() newItemEvent = new EventEmitter<AddressCreation>();

  constructor() {
    this.address = new AddressCreation('',0,'',0,'','',0);
    this.addressStatus="";
   }

  ngOnInit(): void {
  }

  addNewItem() {
    var newAddress = cloneDeep(this.address);
    this.newItemEvent.emit(newAddress);
    this.addressStatus="success";
  }
}
