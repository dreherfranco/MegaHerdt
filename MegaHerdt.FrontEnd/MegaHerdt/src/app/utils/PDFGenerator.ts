import { ElementRef } from "@angular/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export class PDFGenerator {
    static generatePDF(content: ElementRef) {
      const doc = new jsPDF();
      const specialElementHandlers = {
        '#editor': function(element: any, renderer: any) {
          return true;
        }
      };
  
      const htmlContent = content.nativeElement;
  
      html2canvas(htmlContent).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const width = doc.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        doc.addImage(imgData, 'PNG', 0, 0, width, height, '', 'FAST');
        doc.save('table.pdf');
      });
    }
  }