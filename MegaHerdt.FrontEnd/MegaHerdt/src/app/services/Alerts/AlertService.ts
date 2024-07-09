import Swal, { SweetAlertResult } from "sweetalert2";

export class AlertService {
  /**
   * Diálogo informativo con estilo minimalista, colores personalizados y opciones de cierre.
   * Muestra una descripción de un producto.
   * @param title 
   * @param description 
   * @param confirmButtonText 
   * @returns 
   */
  static infoDialog(
    title: string | null, 
    description: string | null = '', 
    confirmButtonText: string | null = 'Cerrar'
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title || 'Descripción del Producto',
      html: description || '',
      icon: 'info',
      showCloseButton: true, // Mostrar la cruz para cerrar
      showCancelButton: false,
      confirmButtonText: confirmButtonText || 'Cerrar',
      customClass: {
        popup: 'minimalist-dialog',
        confirmButton: 'confirm-button',
        closeButton: 'close-button'
      },
      backdrop: 'rgba(0, 0, 125, 0.37)',
      heightAuto: false, // Asegurar que el contenido se ajuste
    });
  }

    /**
   * Alerta donde se debe decidir si se continua o no con la operación. 
   * Dibuja el boton de 'Si' y el de 'No'
   * @param title 
   * @param text 
   * @returns 
   */
  static warningAlert(title: string | null, 
    text: string | null = '', 
    confirmButtonText: string | null = 'Si', 
    cancelButtonText: string | null = 'No' ): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title || '¿Estas seguro que deseas continuar con la operación?',
      text: text || '',
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: confirmButtonText || 'Si',
      cancelButtonText: cancelButtonText || 'No',
      backdrop: 'rgba(0, 0, 125, 0.37)',
    });
  }

  /**
   * Se usa solo para los casos de Alerta de confirmación en donde aparece 
   * el botón de 'OK' solamente
   * @param title
   * @param text 
   * @returns 
   */
  static warningAlertAdvice(title: string | null, text: string | null = ''): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title || '¿Estas seguro que deseas continuar con la operación?',
      text: text || '',
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: false,
      confirmButtonText: 'OK',
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