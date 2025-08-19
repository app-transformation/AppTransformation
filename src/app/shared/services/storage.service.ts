import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  // Initialize storage with default data if not present
  initData(key: string, defaultData: any) {
    const existing = localStorage.getItem(key);
    if (!existing) {
      localStorage.setItem(key, JSON.stringify(defaultData));
    }
  }

  getData<T>(key: string): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  setData<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  addItem<T>(key: string, item: T): void {
    const data = this.getData<T>(key);
    data.push(item);
    this.setData(key, data);
  }

  updateItem<T>(key: string, id: string | number, updatedItem: T, idField = 'id'): void {
    const data = this.getData<T>(key);
    const index = data.findIndex((x: any) => x[idField] === id);
    if (index !== -1) {
      data[index] = updatedItem;
      this.setData(key, data);
    }
  }

  deleteItem<T>(key: string, id: string | number, idField = 'id'): void {
    const data = this.getData<T>(key);
    const newData = data.filter((x: any) => x[idField] !== id);
    this.setData(key, newData);
  }

  clearData(key: string): void {
    localStorage.removeItem(key);
  }
}
