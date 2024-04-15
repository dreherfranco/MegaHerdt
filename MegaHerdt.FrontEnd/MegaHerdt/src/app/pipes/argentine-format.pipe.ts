import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'argentineFormat'
})
export class ArgentineFormatPipe implements PipeTransform {

  transform(value: number): string {
    // Formatear el número con punto como separador de miles y coma al final para decimales
    const formattedValue = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
    return formattedValue;
  }

}
