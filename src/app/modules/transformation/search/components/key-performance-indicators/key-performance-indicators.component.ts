import { Component, Input, OnInit } from '@angular/core';
import { colors } from '../../../../../consts';
import { KeyPerformanceIndicators } from '../../models';

@Component({
  selector: 'app-key-performance-indicators',
  templateUrl: './key-performance-indicators.component.html',
  styleUrls: ['./key-performance-indicators.component.scss']
})
export class KeyPerformanceIndicatorsComponent implements OnInit {
  @Input() kpiData: KeyPerformanceIndicators[] = [];
  public topKPIs: KeyPerformanceIndicators[] = [];
  public restKPIs: KeyPerformanceIndicators[] = [];
  public colors: typeof colors = colors;

  public ngOnInit(): void {
    this.topKPIs = this.kpiData.slice(0, 3);
    this.restKPIs = this.kpiData.slice(3);
  }
  
}
