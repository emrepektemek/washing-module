import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserOrderReportModel } from '../models/userOrderReportModel';

@Injectable({
  providedIn: 'root',
})
export class UserOrderState {
  private userOrder = new BehaviorSubject<UserOrderReportModel[]>([]);

  userOrders$ = this.userOrder.asObservable();

  setUserOrder(userOrder: UserOrderReportModel[]) {
    this.userOrder.next(userOrder);
  }

  clearUserOrder(): void {
    this.userOrder.next([]);
  }
}
