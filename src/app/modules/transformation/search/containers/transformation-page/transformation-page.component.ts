import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TransformationService } from '../../services';
import {
  RevenueChartData,
  InitiativeData,
  RequestStatus,
  RequestTracker,
  KeyPerformanceIndicators
} from '../../models';
import {SharedService} from '../../../../../shared/services/shared.service';
import { ServerChartData } from 'src/app/modules/dashboard/models';

@Component({
  selector: 'app-transformation-page',
  templateUrl: './transformation-page.component.html',
  styleUrls: ['./transformation-page.component.scss']
})
export class TransformationPageComponent {
  public revenueChartData$: Observable<RevenueChartData>;
  public initiativeData$: Observable<InitiativeData[]>;
  public requestStatus$: Observable<RequestStatus>;
  public requestTracker$: Observable<RequestTracker>;
  public serverChartData$: Observable<ServerChartData>;
  public kpiData$: Observable<KeyPerformanceIndicators[]>;
  public todayDate: Date = new Date();
  public currentTheme = '';
  public currentMode = '';
  public selectedInitiative: any = null;
  
  constructor(
    private service: TransformationService,
    private sharedService: SharedService
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
  }
}
