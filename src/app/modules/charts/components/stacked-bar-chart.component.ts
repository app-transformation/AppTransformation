import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html'
})
export class StackedBarChartComponent implements AfterViewInit {
  impactSeries = [
    {
      name: 'Earning (On Track)',
      data: [80, 60, 50, 45]
    },
    {
      name: 'Earning (Delayed)',
      data: [20, 20, 10, 5]
    },
    {
      name: 'Expense (On Track)',
      data: [-15, -20, -25, -20]
    },
    {
      name: 'Expense (Delayed)',
      data: [-5, -5, -3, 0]
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
          (window as any).ApexCharts.exec('stacked-bar', 'toggleSeries', 'Earning (On Track)');
          // Show it again
          setTimeout(() => {
            (window as any).ApexCharts.exec('stacked-bar', 'toggleSeries', 'Earning (On Track)');
          }, 100);
        }
      }, 500);
    }, 0);
  }
}
