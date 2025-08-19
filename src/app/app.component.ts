import { Component, OnInit } from '@angular/core';
import { TransformationService } from './modules/transformation/search/services/transformation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
// export class AppComponent {}
export class AppComponent implements OnInit {
  constructor(private transformationService: TransformationService) {}

  ngOnInit(): void {
    this.transformationService.initializeInitiatives().subscribe(() => {
      console.log('Initiatives loaded into localStorage');
    });
    this.transformationService.initializeKPIs().subscribe(() => {
      console.log('KPIs loaded into localStorage');
    });
  }
}
