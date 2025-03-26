import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderPantModel } from '../models/orderPantModel';

@Injectable({
  providedIn: 'root',
})
export class OrderState {
  private orders = new BehaviorSubject<OrderPantModel[]>([]);

  orders$ = this.orders.asObservable();

  setOrders(reports: OrderPantModel[]) {
    this.orders.next(reports);
  }

  clearOrders(): void {
    this.orders.next([]);
  }
}
