import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-grouped-bar-chart-mixed',
  templateUrl: './grouped-bar-chart-mixed.component.html'
})
export class GroupedBarChartMixedComponent implements AfterViewInit {
  forecastSeries = [
    { name: 'L1', data: [10, 10, 10, 10, 10] },
    { name: 'L2', data: [10, 5, 10, 10, 10] },
    { name: 'L3', data: [10, 10, 20, 10, 10] },
    { name: 'L4', data: [10, 10, 25, 10, 10] }
  ];
  forecastCategories = ['Jan’25', 'Feb’25', 'Mar’25', 'Apr’25', 'May’25'];
  chartVisible = false;
  ngAfterViewInit() {
    setTimeout(() => this.chartVisible = true, 0);
  }
}
