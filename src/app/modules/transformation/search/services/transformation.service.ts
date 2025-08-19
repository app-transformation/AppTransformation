import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../../../shared/services/storage.service';

import {
  RevenueChartData,
  InitiativeData,
  KeyPerformanceIndicators,
  RequestTracker,
  RequestStatus
} from '../models';
import { MilestoneData } from '../../components/milestone-table/milestone-table.component';


@Injectable({
  providedIn: 'root'
})
export class TransformationService {
  private readonly initiativesKey = 'initiatives';
  private readonly kpisKey = 'kpis';
  private readonly milestonesKey = 'milestones';


  constructor(
    private storage: StorageService,
    private http: HttpClient
  ) {}

  initializeInitiatives(): Observable<void> {
    return this.http.get<InitiativeData[]>('/assets/transformation/initiatives.json').pipe(
      tap(data => this.storage.initData(this.initiativesKey, data)),
      map(() => void 0)
    );
  }

  initializeKPIs(): Observable<void> {
    return this.http.get<KeyPerformanceIndicators[]>('/assets/transformation/kpi.json').pipe(
      tap(data => this.storage.initData(this.kpisKey, data)),
      map(() => void 0)
    );
  }

  private getInitiatives(): InitiativeData[] {
    return this.storage.getData<InitiativeData>(this.initiativesKey);
  }

  private getKeyPerformanceIndicators(): KeyPerformanceIndicators[] {
    return this.storage.getData<KeyPerformanceIndicators>(this.kpisKey);
  }

  public loadInitiativeData(): Observable<InitiativeData[]> {
    const initiatives = this.getInitiatives();
    return of(initiatives);
  }

  public loadKeyPerformanceIndicators(): Observable<KeyPerformanceIndicators[]> {
    const kpis = this.getKeyPerformanceIndicators();
    return of(kpis);
  }

  public addInitiative(item: InitiativeData): void {
    this.storage.addItem<InitiativeData>(this.initiativesKey, item);
  }

  public updateInitiative(id: string, updated: InitiativeData): void {
    this.storage.updateItem<InitiativeData>(this.initiativesKey, id, updated);
  }

  public deleteInitiative(id: string): void {
    this.storage.deleteItem<InitiativeData>(this.initiativesKey, id);
  }

  public loadRevenueChartData(): Observable<RevenueChartData> {
    return of({
      groupA: Math.round(Math.random() * 100),
      groupB: Math.round(Math.random() * 100),
      groupC: Math.round(Math.random() * 100),
      groupD: Math.round(Math.random() * 100)
    });
  }

  public loadRequestTracker(): Observable<RequestTracker> {
    return this.loadInitiativeData().pipe(
      map((data) => {
        const onTrack = data.filter((item) => item.status === 'completed').length.toString();
        const delayed = data.filter((item) => item.status === 'delayed').length.toString();

        return {
          onTrack,
          delayed,
        };
      })
    );
  }

  public loadRequestStatus(): Observable<RequestStatus> {
    return this.loadInitiativeData().pipe(
      map((data) => {
        const initiative = data.length.toString();
        const milestone = '0'; // Assuming milestones are not part of the data
        const newStatus = data.filter((item) => item.status === 'pending').length.toString();
        const inprocess = data.filter((item) => item.status === 'in progress').length.toString();
        const completed = data.filter((item) => item.status === 'completed').length.toString();

        return {
          initiative,
          milestone,
          new: newStatus,
          inprocess,
          completed,
        };
      })
    );
  }

  public loadMilestoneData(): Observable<MilestoneData[]> {
    const milestones = this.storage.getData<MilestoneData>(this.milestonesKey) || [];
    return of(milestones);
  }

  public addMilestone(item: MilestoneData): void {
    this.storage.addItem<MilestoneData>(this.milestonesKey, item);
  }

  public updateMilestone(id: string, updated: MilestoneData): void {
    this.storage.updateItem<MilestoneData>(this.milestonesKey, id, updated);
  }

  public deleteMilestone(id: string): void {
    this.storage.deleteItem<MilestoneData>(this.milestonesKey, id);
  }
}
