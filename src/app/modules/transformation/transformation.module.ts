import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NgxEchartsModule } from 'ngx-echarts';
import { TrendModule } from 'ngx-trend';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';

import { TransformationPageComponent } from './search/containers';
import {
  RequestTrackerComponent,
  RequestStatusComponent,
  KeyPerformanceIndicatorsComponent,
  RevenueChartComponent,
  InitiativeDataComponent,
} from './search/components';

import {
  ActivityHistoryComponent
} from './activity-history/components';

import { SharedModule } from '../../shared/shared.module';
import { TransformationService } from './search/services';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import { TransformationInitiativePageComponent } from './containers/transformation-initiative-page/transformation-initiative-page.component';
import { MilestoneTableComponent } from './components/milestone-table/milestone-table.component';
import { MilestoneDetailComponent } from './components/milestone-detail/milestone-detail.component';
import { ImpactTableComponent } from './components/impact-table/impact-table.component';


@NgModule({
  declarations: [
    TransformationPageComponent,
    TransformationInitiativePageComponent,
    RequestTrackerComponent,
    RequestStatusComponent,
    KeyPerformanceIndicatorsComponent,
    RevenueChartComponent,
    InitiativeDataComponent,
    ActivityHistoryComponent,
    MilestoneTableComponent,
    MilestoneDetailComponent,
    ImpactTableComponent
  ],
    imports: [
        CommonModule,
        MatTableModule,
        NgxEchartsModule,
        TrendModule,
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatProgressBarModule,
        MatToolbarModule,
        MatGridListModule,
        MatSelectModule,
        MatInputModule,
        NgApexchartsModule,
        FormsModule,
        SharedModule,
        MatTabsModule,
        MatCheckboxModule,
        MatSortModule
    ],
  exports: [
  ],
  providers: [
    TransformationService
  ]
})
export class TransformationModule { }
