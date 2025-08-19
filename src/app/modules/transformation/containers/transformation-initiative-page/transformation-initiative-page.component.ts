import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { SharedService } from '../../../../shared/services/shared.service';
import { RevenueChartData, InitiativeData, InitiativeField, KeyPerformanceIndicators, RequestStatus, RequestTracker } from '../../search/models';
import { TransformationService } from '../../search/services';
import { MilestoneData } from '../../components/milestone-table/milestone-table.component';


@Component({
  selector: 'app-transformation-initiative-page',
  templateUrl: './transformation-initiative-page.component.html',
  styleUrls: ['./transformation-initiative-page.component.scss']
})
export class TransformationInitiativePageComponent implements OnInit {
  @Input() initiative: any;
  @Output() back = new EventEmitter<void>();
  public initiativeId: string | null = null;

  public revenueChartData$: Observable<RevenueChartData>;
  public initiativeData$: Observable<InitiativeData[]>;
  public requestStatus$: Observable<RequestStatus>;
  public requestTracker$: Observable<RequestTracker>;
  public kpiData$: Observable<KeyPerformanceIndicators[]>;
  public todayDate: Date = new Date();
  public currentTheme = '';
  public currentMode = '';
  selectedMilestone: MilestoneData | null = null;
  
  status = 'On Track'; // Example, replace with your actual status logic

  public selectedInitiative: InitiativeData | null = null;

  totalExpenditure: number = 0;
  totalEarning: number = 0;
  get netImpact(): number {
    return this.totalEarning - this.totalExpenditure;
  }

  showAddInitiativeForm = false;

  public isAddMode = false;

  public emptyInitiative: InitiativeData = {
    initiativeId: '',
    workstreamId: '',
    status: '',
    stage: '',
    ownerId: '',
    previousApproverId: '',
    description: '',
    intendedDate: '',
    aspiredDate: '',
    actualDate: '',
    weeklyMeetingFlag: false,
    needAttention: false,
    priorityMarker: '',
    createdAt: new Date().toISOString(),
    fields: [
      { id: '', parentId: '', fieldId: '', fieldName: 'Total Expenditure', fieldValue: '', createdAt: new Date().toISOString() },
      { id: '', parentId: '', fieldId: '', fieldName: 'Total Earning', fieldValue: '', createdAt: new Date().toISOString() },
      { id: '', parentId: '', fieldId: '', fieldName: 'Net Impact', fieldValue: '', createdAt: new Date().toISOString() }
    ]
  };

  constructor(
    private service: TransformationService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.revenueChartData$ = this.service.loadRevenueChartData();
    this.initiativeData$ = this.service.loadInitiativeData();
    this.requestStatus$ = this.service.loadRequestStatus();
    this.requestTracker$ = this.service.loadRequestTracker();
    this.kpiData$ = this.service.loadKeyPerformanceIndicators();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  public ngOnInit(): void {
    this.sharedService.currentTheme.subscribe((theme: string) => {
      this.currentTheme = theme;
    });

    this.sharedService.currentMode.subscribe((mode: string) => {
      this.currentMode = mode;
    });

    console.log('Transformation Initiative Page Component Initialized');
    this.initiativeId = this.route.snapshot.paramMap.get('id');
    console.log('Initiative ID:', this.initiativeId);

    if (this.initiativeId === 'new') {
      this.isAddMode = true;
      this.selectedInitiative = this.emptyInitiative;
      this.status = '';
    } else if (this.initiative) {
      this.selectedInitiative = this.initiative;
      this.status = this.initiative.status;
    } else if (this.initiativeId) {
      this.service.loadInitiativeData().subscribe((initiatives) => {
        const found = initiatives.find(i => i.initiativeId.toString() === this.initiativeId);
        if (found) {
          this.selectedInitiative = found;
          this.status = found.status;
        }
      });
    }

    console.log('Selected Initiative:', this.selectedInitiative);
  }

  saveNewInitiative() {
    // Generate a new InitiativeData object with correct fields
    const newId = Date.now().toString();
    const newInitiative: InitiativeData = {
      ...this.selectedInitiative,
      initiativeId: newId,
      createdAt: new Date().toISOString(),
      fields: this.selectedInitiative?.fields?.map(f => {
        if (f.fieldName === 'Net Impact') {
          const expenditure = Number(this.getFieldValue('Total Expenditure')) || 0;
          const earning = Number(this.getFieldValue('Total Earning')) || 0;
          return { ...f, fieldValue: (earning - expenditure).toString() };
        }
        return f;
      }) || []
    };
    this.service.addInitiative(newInitiative);
    this.back.emit();
  }

  updateTotals(event: { earning: number, expenditure: number }) {
    this.totalEarning = event.earning;
    this.totalExpenditure = event.expenditure;
  }

  applyInitiativeFilter(event: Event): void {
    // TODO: Implement initiative filter logic
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
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

  getFieldValue(fieldName: string): string {
    return this.selectedInitiative?.fields?.find(f => f.fieldName === fieldName)?.fieldValue || '';
  }

  get dynamicFields(): InitiativeField[] {
    // Return all fields for this initiative
    return this.selectedInitiative?.fields || [];
  }
}
