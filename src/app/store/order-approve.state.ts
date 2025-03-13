import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderApproveModel } from '../models/orderApproveModel';

@Injectable({
  providedIn: 'root',
})
export class OrderApproveState {
  private orderApproves = new BehaviorSubject<OrderApproveModel[]>([]);

  orderApproves$ = this.orderApproves.asObservable();

  setOrderApproves(orderApprove: OrderApproveModel[]) {
    this.orderApproves.next(orderApprove);
  }

  delete(orderId: number): void {
    const updatedOrders = this.orderApproves
      .getValue()
      .filter((order) => order.id !== orderId);

    this.orderApproves.next(updatedOrders);
  }

  clearOrderApproves(): void {
    this.orderApproves.next([]);
  }
}
