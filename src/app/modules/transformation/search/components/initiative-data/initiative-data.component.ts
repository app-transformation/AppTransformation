import { Component, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { InitiativeData, InitiativeField } from '../../models';
import { TransformationService } from '../../services';

@Component({
  selector: 'app-initiative-data',
  templateUrl: './initiative-data.component.html',
  styleUrls: ['./initiative-data.component.scss']
})
export class InitiativeDataComponent implements OnInit, AfterViewInit {
  @Input() initiativeData: any[] = []; // Accept data from parent component
  @Output() initiativeSelected = new EventEmitter<any>();
  displayedColumns: string[] = [
    'initiativeId', 'intendedDate', 'aspiredDate', 'ownerId', 'stage', 'status'
  ];

  
  dynamicFieldNames: string[] = [];
  dataSource = new MatTableDataSource<InitiativeData>();
  showAddInitiativeForm = false;

  newInitiative: any = {
    initiativeId: '',
    status: '',
    stage: '',
    ownerId: '',
    description: '',
    intendedDate: '',
    aspiredDate: '',
    fields: []
  };

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: TransformationService, private router: Router) {}

  ngOnInit(): void {
    this.dataSource.data = this.initiativeData; // Assign input data to the table
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initiativeData']) {
      this.dataSource = new MatTableDataSource(this.initiativeData);

      // Collect all unique dynamic field names
      const fieldNames = new Set<string>();
      this.initiativeData.forEach(item =>
        item.fields?.forEach((f: InitiativeField) => fieldNames.add(f.fieldName))
      );
      this.dynamicFieldNames = Array.from(fieldNames);

      // Add dynamic columns to displayedColumns
      this.displayedColumns = [
        'initiativeId', 'intendedDate', 'aspiredDate', 'ownerId', 'stage', 'status',
        ...this.dynamicFieldNames
      ];
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(row: any) {
    this.router.navigate(['/transformation-initiative', row.initiativeId]);
  }

  onAddInitiative() {
    this.router.navigate(['/transformation-initiative', 'new']);
  }

  getFieldValue(fields: InitiativeField[] = [], name: string): string {
    const field = fields.find(f => f.fieldName === name);
    return field ? field.fieldValue : '';
  }

  saveInitiative() {
    // Generate a new ID (simple timestamp for demo)
    this.newInitiative.initiativeId = Date.now().toString();
    this.service.addInitiative({ ...this.newInitiative });
    this.dataSource.data = [...this.dataSource.data, { ...this.newInitiative }];
    this.showAddInitiativeForm = false;
    this.newInitiative = {
      initiativeId: '',
      status: '',
      stage: '',
      ownerId: '',
      description: '',
      intendedDate: '',
      aspiredDate: '',
      fields: []
    };
  }
}