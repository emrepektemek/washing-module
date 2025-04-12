import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderDefectWithDefectAndOrderModel } from '../models/orderDefectWithDefectAndOrderModel';

@Injectable({
  providedIn: 'root',
})
export class OrderDefectState {
  private orderDefects = new BehaviorSubject<
    OrderDefectWithDefectAndOrderModel[]
  >([]);

  orderDefects$ = this.orderDefects.asObservable();

  setOrderDefect(reports: OrderDefectWithDefectAndOrderModel[]) {
    this.orderDefects.next(reports);
  }

  clearOrderDefect(): void {
    this.orderDefects.next([]);
  }
}
