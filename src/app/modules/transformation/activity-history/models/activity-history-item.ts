export interface ActivityHistoryItem {
  username: string;
  dateTime: string; // ISO string or formatted date
  type: 'Edit' | 'Create' | 'Delete';
  previousValue: string;
  newValue: string;
}