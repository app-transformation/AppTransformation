import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsPageComponent } from './containers/charts-page/charts-page.component';
import { GroupedBarChartComponent } from './components/grouped-bar-chart.component';
import { GroupedBarChartMixedComponent } from './components/grouped-bar-chart-mixed.component';
import { GroupedBarChartNoGroupComponent } from './components/grouped-bar-chart-no-group.component';
import { StackedBarChartComponent } from './components/stacked-bar-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    ChartsPageComponent,
    GroupedBarChartComponent,
    GroupedBarChartMixedComponent,
    GroupedBarChartNoGroupComponent,
    StackedBarChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    ChartsRoutingModule,
    NgApexchartsModule
  ]
})
export class ChartsModule {}
