import { Component, OnInit } from '@angular/core';
import { ActivityHistoryService } from '../../services/activity-history.service';
import { ActivityHistoryItem } from '../../models/activity-history-item';

@Component({
  selector: 'app-activity-history',
  templateUrl: './activity-history.component.html',
  styleUrls: ['./activity-history.component.scss']
})
export class ActivityHistoryComponent implements OnInit {
  activityHistory: ActivityHistoryItem[] = [];

  constructor(private activityHistoryService: ActivityHistoryService) {}

  ngOnInit(): void {
    this.activityHistoryService.getActivityHistory().subscribe(data => {
      // Sort descending by dateTime
      this.activityHistory = data.sort((a, b) => b.dateTime.localeCompare(a.dateTime));
    });
  }

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

}