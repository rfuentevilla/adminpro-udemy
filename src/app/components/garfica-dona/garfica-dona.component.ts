import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-garfica-dona',
  templateUrl: './garfica-dona.component.html',
  styles: []
})
export class GarficaDonaComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('ChartLabels') doughnutChartLabels: string[] = [];
  // tslint:disable-next-line:no-input-rename
  @Input('ChartData') doughnutChartData: number[] = [];
  // tslint:disable-next-line:no-input-rename
  @Input('ChartType') doughnutChartType: string = '';


  constructor() { }

  ngOnInit() {
    // this.doughnutChartData = this.dataGrafico;
    // this.doughnutChartLabels = this.label;
    // // this.doughnutChartType: ChartType = this.typeGrafico;
  }

}
