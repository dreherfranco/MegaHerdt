import { Component, OnInit, ViewChild } from '@angular/core';
import { BrandStatistics } from 'src/app/models/ArticleBrand/BrandStatistics';
import { BrandService } from 'src/app/services/brand/brand.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-brand-graphic',
  templateUrl: './brand-graphic.component.html',
  styleUrls: ['./brand-graphic.component.css']
})
export class BrandGraphicComponent implements OnInit {
  brandsStatistics: BrandStatistics[] = [];

  constructor(private _brandService: BrandService, private _storageService: StorageService) {

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
    this._brandService.getStatistics(this._storageService.getTokenValue()).subscribe({
      next: res => {
        this.brandsStatistics = res;
        this.barChartData.datasets[0].label = "Cantidad articulos";
        for (var i = 0; i < this.brandsStatistics.length; i++) {
          this.barChartData.labels?.push(this.brandsStatistics[i].name);
          this.barChartData.datasets[0].data.push(this.brandsStatistics[i].articlesQuantity);
        }
        this.chart?.update();
      }
    })
  }

}
