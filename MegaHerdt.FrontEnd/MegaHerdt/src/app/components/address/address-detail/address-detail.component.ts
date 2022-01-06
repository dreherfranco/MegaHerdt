import { Component, OnInit, Input } from '@angular/core';
import { AddressCreation } from 'src/app/models/Address/AddressCreation';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {
  @Input() address: AddressCreation;
  
  constructor() {
    this.address = new AddressCreation('',0,'',0,'','',0);
   }

  ngOnInit(): void {
  }

}
