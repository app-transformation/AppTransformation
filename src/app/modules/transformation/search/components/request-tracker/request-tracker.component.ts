import { Component, Input } from '@angular/core';

import { RequestTracker } from '../../models';

@Component({
  selector: 'app-request-tracker',
  templateUrl: './request-tracker.component.html',
  styleUrls: ['./request-tracker.component.scss']
})
export class RequestTrackerComponent {
  @Input() requestTrackerData: RequestTracker;
  @Input() currentTheme: string;

  getProgress(count: string | undefined, other: string | undefined): number {
    const a = Number(count) || 0;
    const b = Number(other) || 0;
    const total = a + b;
    return total === 0 ? 0 : Math.round((a / total) * 100);
  }
  
}