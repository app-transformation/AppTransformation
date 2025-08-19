import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MilestoneData } from '../milestone-table/milestone-table.component';

@Component({
  selector: 'app-milestone-detail',
  templateUrl: './milestone-detail.component.html',
  styleUrls: ['./milestone-detail.component.scss']
})
export class MilestoneDetailComponent {
  @Input() milestone!: MilestoneData;
  @Input() initiativeStatus: string = '';
  @Input() initiativeTitle: string = '';
  @Output() back = new EventEmitter<void>();
  @Output() saveMilestone = new EventEmitter<MilestoneData>();

  milestoneForm: MilestoneData = {
    status: '',
    initiativeStage: '',
    milestoneOwner: '',
    description: '',
    avgSpendFte: '',
    avgCostPerVendor: '',
    avgTimeForMilestoneCompletion: '',
    intendedDate: '',
    aspiredDate: '',
    actualDate: '',
    weeklyMeetingFlag: '',
    needXAttention: '',
    priorityMarker: ''
  };

  getStatusClass(status: string): string {
    switch ((status || '').toLowerCase()) {
      case 'on track':
        return 'status-on-track';
      case 'delayed':
        return 'status-delayed';
      case 'in progress':
        return 'status-in-progress';
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-on-track';
      default:
        return '';
    }
  }

  save() {
    this.saveMilestone.emit(this.milestoneForm);
  }
}
