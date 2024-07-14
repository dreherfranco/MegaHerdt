import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from 'src/app/utils/Global';

@Injectable({
  providedIn: 'root'
})
export class BackupService {
  public url: string;
  public headers =  new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) 
  {
    this.url = Global.url + "Backups";
  }

  getBackup(token: string): Observable<any>{
    this.headers = this.headers.set('Authorization', token);
    return this._http.get(this.url, { headers: this.headers });
  }

  restore(selectedFile: File, databaseName: string = '',token: string=''): Observable<any>{
    const formData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);
        formData.append('databaseName', databaseName);

    this.headers = this.headers.set('Authorization', token);
    return this._http.post(this.url + '/restore', formData, { headers: this.headers });
  }

  restoreSendFormData(selectedFile: File): Observable<any>{

        const formData: FormData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);

        var xhr = new XMLHttpRequest();

        xhr.open('POST', Global.url + "Backups/restore", true );  
        xhr.send(formData);

        this.headers = this.headers.set('Authorization', '');

        return this._http.get(this.url, { headers: this.headers });
  }

}
