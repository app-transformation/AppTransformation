import { Component, Output, EventEmitter } from '@angular/core';

interface ImpactRow {
  type: 'Earning' | 'Expenditure';
  category: string;
  description: string;
  attachment: File | null;
  value: string;
  disabled?: boolean; // Added to fix lint errors and support row disabling
}

@Component({
  selector: 'app-impact-table',
  templateUrl: './impact-table.component.html',
  styleUrls: ['./impact-table.component.scss']
})
export class ImpactTableComponent {
  @Output() totalsChanged = new EventEmitter<{ earning: number, expenditure: number }>();

  showExtraRows = false;

  impactRows: ImpactRow[] = [
    {
      type: 'Earning',
      category: '',
      description: '',
      attachment: null,
      value: '',
      disabled: false
    },
    {
      type: 'Expenditure',
      category: '',
      description: '',
      attachment: null,
      value: '',
      disabled: false
    }
  ];

  earningCategories = ['New stream', 'New product'];
  expenditureCategories = ['FTE cost serving', 'Another category'];

  onTypeChange(row: ImpactRow) {
    row.category = '';
    this.emitTotals();
  }

  onFileSelected(event: any, row: ImpactRow) {
    const file = event.target.files[0];
    if (file) {
      row.attachment = file;
    }
  }

  getCategories(row: ImpactRow) {
    return row.type === 'Earning' ? this.earningCategories : this.expenditureCategories;
  }

  addRow() {
    this.impactRows.push({
      type: 'Earning',
      category: '',
      description: '',
      attachment: null,
      value: ''
    });
    this.emitTotals();
  }

  onValueChange() {
    this.emitTotals();
  }

  emitTotals() {
    const earning = this.impactRows.filter(r => r.type === 'Earning').reduce((sum, r) => sum + (+r.value || 0), 0);
    const expenditure = this.impactRows.filter(r => r.type === 'Expenditure').reduce((sum, r) => sum + (+r.value || 0), 0);
    this.totalsChanged.emit({ earning, expenditure });
  }

  get displayRows(): ImpactRow[] {
    return this.impactRows;
  }

  addExtraRows() {
    // Disable all inputs in the first two rows
    if (this.impactRows[0]) this.impactRows[0].disabled = true;
    if (this.impactRows[1]) this.impactRows[1].disabled = true;
    // Add two new rows with same type and category as first two rows
    if (this.impactRows[0]) {
      this.impactRows.push({
        type: this.impactRows[0].type,
        category: this.impactRows[0].category,
        description: '',
        attachment: null,
        value: '',
        disabled: false
      });
    }
    if (this.impactRows[1]) {
      this.impactRows.push({
        type: this.impactRows[1].type,
        category: this.impactRows[1].category,
        description: '',
        attachment: null,
        value: '',
        disabled: false
      });
    }
    this.emitTotals();
  }
}
