import { Component } from '@angular/core';

@Component({
  selector: 'app-charts-page',
  templateUrl: './charts-page.component.html',
  styleUrls: ['./charts-page.component.scss']
})
export class ChartsPageComponent {
  selectedCharts: string[] = ['initiative'];

  initiativeSeries = [
  {
    name: 'On Track',
    data: [15, 8, 3, 1]
  },
  {
    name: 'Delayed',
    data: [5, 2, 1, 0]
  }
];

forecastSeries = [
  { name: 'L1', data: [10, 10, 10, 10, 10] },
  { name: 'L2', data: [10, 5, 10, 10, 10] },
  { name: 'L3', data: [10, 10, 20, 10, 10] },
  { name: 'L4', data: [10, 10, 25, 10, 10] }
];

forecastCategories = ['Jan’25', 'Feb’25', 'Mar’25', 'Apr’25', 'May’25'];


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

  toggleChart(chart: string) {
    const idx = this.selectedCharts.indexOf(chart);
    if (idx > -1) {
      this.selectedCharts.splice(idx, 1);
    } else {
      this.selectedCharts.push(chart);
    }
  }
}
