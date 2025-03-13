import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderReportModel } from '../models/orderReportModel';

@Injectable({
  providedIn: 'root',
})
export class OrderReportState {
  private orderReports = new BehaviorSubject<OrderReportModel[]>([]);

  orderReports$ = this.orderReports.asObservable();

  setOrderReports(reports: OrderReportModel[]) {
    this.orderReports.next(reports);
  }

  clearOrderReports(): void {
    this.orderReports.next([]);
  }
}
