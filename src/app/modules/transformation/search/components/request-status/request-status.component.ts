import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { RequestStatus } from '../../models';

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.scss']
})
export class RequestStatusComponent {
  @Input() requestStatusData: RequestStatus;
  @Input() currentTheme: string;

  
}
