import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _storageService: StorageService) { }

  ngOnInit(): void {
  }

  authenticated(): boolean{
    return this._storageService.isAuthenticated();
  }
}
