import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InventoryReportModel } from '../models/inventoryReportModel';

@Injectable({
  providedIn: 'root',
})
export class InventoryReportState {
  private inventoryReports = new BehaviorSubject<InventoryReportModel[]>([]);

  inventoryReports$ = this.inventoryReports.asObservable();

  setInventoryReports(reports: InventoryReportModel[]) {
    this.inventoryReports.next(reports);
  }

  clearInventoryReports(): void {
    this.inventoryReports.next([]);
  }
}
