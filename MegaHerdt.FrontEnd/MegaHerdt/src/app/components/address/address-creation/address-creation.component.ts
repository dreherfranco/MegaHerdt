import { Component, Input, OnInit } from '@angular/core';
import { AddressCreation } from 'src/app/models/Address/AddressCreation';

@Component({
  selector: 'app-address-creation',
  templateUrl: './address-creation.component.html',
  styleUrls: ['./address-creation.component.css']
})
export class AddressCreationComponent implements OnInit {
  @Input() address: AddressCreation;

  constructor() {
    this.address = new AddressCreation('',0,'',0,'','','');
   }

  ngOnInit(): void {
  }

}
