import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-grouped-bar-chart-no-group',
  templateUrl: './grouped-bar-chart-no-group.component.html'
})
export class GroupedBarChartNoGroupComponent implements AfterViewInit {
  valueLeakageSeries = [
    {
      name: 'Earning',
      data: [80, 60, 50]
    },
    {
      name: 'Expense',
      data: [-20, -5, -5]
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
          (window as any).ApexCharts.exec('grouped-bar-no-group', 'toggleSeries', 'Earning');
          // Show it again
          setTimeout(() => {
            (window as any).ApexCharts.exec('grouped-bar-no-group', 'toggleSeries', 'Earning');
          }, 100);
        }
      }, 500);
    }, 0);
  }
}
