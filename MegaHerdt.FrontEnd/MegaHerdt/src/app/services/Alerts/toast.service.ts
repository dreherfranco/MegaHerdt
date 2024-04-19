import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, duration: number = 2000, action: string = 'Cerrar') {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-toast']
    });
  }

  showWarning(message: string, duration: number = 2000, action: string = 'Cerrar') {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['warning-toast']
    });
  }

  showError(message: string, duration: number = 2000, action: string = 'Cerrar') {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-toast']
    });
  }
}
