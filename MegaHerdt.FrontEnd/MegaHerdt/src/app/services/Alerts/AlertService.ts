import Swal, { SweetAlertResult } from "sweetalert2";

export class AlertService {
  static warningAlert(title: string | null, text: string | null = ''): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title || 'Seguro que deseas continuar con la operación',
      text: text || '',
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      backdrop: 'rgba(0, 0, 125, 0.37)',
    });
  }

  static errorAlert(title: string | null, text: string | null = ''): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title || 'Hubo un error en la operación',
      text: text || '',
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: 'OK',
      backdrop: 'rgba(0, 0, 125, 0.37)',
    });
  }

  static successAlert(title: string | null, text: string | null = ''): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title || 'Operación exitosa',
      text: text || '',
      icon: 'success',
      allowOutsideClick: false,
      confirmButtonText: 'OK',
      backdrop: 'rgba(0, 0, 125, 0.37)',
    });
  }
}