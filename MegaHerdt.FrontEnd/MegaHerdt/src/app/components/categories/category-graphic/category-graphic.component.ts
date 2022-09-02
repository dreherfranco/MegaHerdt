import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { CategoryService } from 'src/app/services/category/category.service';
import { CategoryStatistics } from 'src/app/models/ArticleCategory/CategoryStatistics';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-category-graphic',
  templateUrl: './category-graphic.component.html',
  styleUrls: ['./category-graphic.component.css']
})

export class CategoryGraphicComponent implements OnInit {
  categoryStatistics: CategoryStatistics[] = [];

  constructor(private _categoryService: CategoryService, private _storageService: StorageService) {

  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: []
      },
      {
        data: []
      },
      {
        data: []
      }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  ngOnInit(): void {
    this._categoryService.getStatistics(this._storageService.getTokenValue()).subscribe({
      next: res => {
        this.categoryStatistics = res;
        this.barChartData.datasets[0].label = "Cantidad articulos";
        this.barChartData.datasets[1].label = "Unidades compradas";
        this.barChartData.datasets[2].label = "Unidades utilizadas por reparaciones";

        for (var i = 0; i < this.categoryStatistics.length; i++) {
          let articlesQuantity = this.categoryStatistics[i].articlesQuantity;
          let purchasesQuantity = this.categoryStatistics[i].purchasesQuantity;
          let reparationsQuantity = this.categoryStatistics[i].reparationsQuantity;
          
          if(articlesQuantity > 0 || purchasesQuantity > 0 || reparationsQuantity > 0){
            this.barChartData.labels?.push(this.categoryStatistics[i].name);
            articlesQuantity > 0 ? this.barChartData.datasets[0].data.push(articlesQuantity) : null;
            purchasesQuantity > 0 ? this.barChartData.datasets[1].data.push(purchasesQuantity) : null;
            reparationsQuantity > 0 ? this.barChartData.datasets[2].data.push(reparationsQuantity) : null;
          }
        }
        this.chart?.update();
      }
    })
  }
}
