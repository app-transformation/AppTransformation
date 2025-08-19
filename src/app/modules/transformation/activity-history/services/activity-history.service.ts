import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivityHistoryItem } from '../models/activity-history-item';

@Injectable({
  providedIn: 'root'
})
export class ActivityHistoryService {
  public getActivityHistory(): Observable<ActivityHistoryItem[]> {
    return of([
      {
        username: 'John Doe',
        dateTime: '2025-06-21T14:30:00Z',
        type: 'Create',
        previousValue: '',
        newValue: 'Initial record created'
      },
      {
        username: 'Jane Smith',
        dateTime: '2025-06-22T09:15:00Z',
        type: 'Edit',
        previousValue: 'Initial record created',
        newValue: 'Updated record with new info'
      },
      {
        username: 'John Doe',
        dateTime: '2025-06-23T11:00:00Z',
        type: 'Delete',
        previousValue: 'Updated record with new info',
        newValue: ''
      }
    ]);
  }
}