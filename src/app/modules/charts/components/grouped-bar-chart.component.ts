import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-grouped-bar-chart',
  templateUrl: './grouped-bar-chart.component.html'
})
export class GroupedBarChartComponent implements AfterViewInit {
  initiativeSeries = [
    {
      name: 'On Track',
      data: [15, 8, 3, 12]
    },
    {
      name: 'Delayed',
      data: [5, 2, 1, 0]
    }
  ];
  chartVisible = false;
  ngAfterViewInit() {
    setTimeout(() => {
      this.chartVisible = true;
      // Hack: Uncheck and re-check a series to force all visible
      setTimeout(() => {
        const chart = (window as any).ApexCharts && (window as any).ApexCharts.exec;
        if (chart) {
          // Hide first series
          (window as any).ApexCharts.exec('grouped-bar', 'toggleSeries', 'On Track');
          // Show it again
          setTimeout(() => {
            (window as any).ApexCharts.exec('grouped-bar', 'toggleSeries', 'On Track');
          }, 100);
        }
      }, 500);
    }, 0);
  }
}
