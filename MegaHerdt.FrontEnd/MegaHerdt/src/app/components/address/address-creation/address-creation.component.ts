import { Component, Input, OnInit } from '@angular/core';
import { AddressCreation } from 'src/app/models/Address/AddressCreation';
import { provinces } from 'src/app/data/provinces';
import { departments } from 'src/app/data/departments';
import { localities1 } from 'src/app/data/localities1';
import { localities2 } from 'src/app/data/localities2';
import { Provincia } from 'src/app/data/models/Provincia';
import { Departamento } from 'src/app/data/models/Departamento';
import { LocalidadCensal } from 'src/app/data/models/LocalidadCensal';

@Component({
  selector: 'app-address-creation',
  templateUrl: './address-creation.component.html',
  styleUrls: ['./address-creation.component.css']
})
export class AddressCreationComponent implements OnInit {
  @Input() address: AddressCreation;
  provinces = provinces;
  provinceId: string = '';
  provinceChoosed: boolean = false;
  departments = departments.departamentos;
  departmentId: string = '';
  departmentChoosed: boolean = false;
  localities = localities1.localidades;
  localityId: string = '';
  localityChoosed: boolean = false;

  constructor() {
    this.address = new AddressCreation('', 0, '', 0, '', '', '');
  }

  ngOnInit(): void {
  }

  onChangeProvinces() {
    this.departments = [];
    for (var i = 0; i < departments.departamentos.length; i++) {
      if (departments.departamentos[i].provincia.id == this.provinceId) {
        this.departments.push(departments.departamentos[i]);
        this.address.province = departments.departamentos[i].provincia.nombre;
      }
    }
    this.provinceChoosed = true;
    this.departmentChoosed = false;
    this.departmentId = '';
    this.localityId = '';
  }

  onChangeDepartments() {
    this.localities = [];
    for (let i = 0; i < localities1.localidades.length; i++) {
      if (localities1.localidades[i].departamento.id == this.departmentId) {
        this.localities.push(localities1.localidades[i]);
        this.address.department = localities1.localidades[i].departamento.nombre;
      }
    }
    for (let i = 0; i < localities2.localidades.length; i++) {
      if (localities2.localidades[i].departamento.id == this.departmentId) {
        this.localities.push(localities2.localidades[i]);
        this.address.department = localities1.localidades[i].departamento.nombre;
      }
    }
    this.localityId = 'new LocalidadCensal()';
    this.departmentChoosed = true;
    this.localityChoosed = false;
  }

  onChangeLocalities() {
    this.localityChoosed = true;
    for (let i = 0; i < localities1.localidades.length; i++) {
      if (localities1.localidades[i].id == this.localityId) {
        this.address.townName = localities1.localidades[i].nombre;
      }
    }
    for (let i = 0; i < localities2.localidades.length; i++) {
      if (localities2.localidades[i].id == this.localityId) {
        this.address.townName = localities1.localidades[i].nombre;
      }
    }
  }
}
