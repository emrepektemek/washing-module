import { Component, OnInit } from '@angular/core';
import { OrderPantModel } from '../../models/orderPantModel';
import { OrderState } from '../../store/order.state';
import { forkJoin, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-pant-list-for-quality-control',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-pant-list-for-quality-control.component.html',
  styleUrl: './order-pant-list-for-quality-control.component.css',
})
export class OrderPantListForQualityControlComponent implements OnInit {
  orders: OrderPantModel[] = [];
  filteredOrders: OrderPantModel[] = [];

  searchOrder: string = '';

  dataLoaded: boolean = false;

  constructor(private orderState: OrderState, private router: Router) {}

  ngOnInit(): void {
    forkJoin({
      orders: this.orderState.orders$.pipe(take(1)),
    }).subscribe(({ orders }) => {
      this.orders = orders;
      this.dataLoaded = true;
      this.filteredOrders = this.orders;
    });
  }

  filterOrders(): void {
    if (this.searchOrder) {
      const searchLower = this.searchOrder.toLowerCase();
      this.filteredOrders = this.orders.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchLower) ||
          order.modelName.toLowerCase().includes(searchLower)
      );
    } else {
      this.filteredOrders = this.orders;
    }
  }

  orderSelected(order: OrderPantModel): void {
    this.router.navigate(['/home/quality-control-summary'], {
      state: { selectedOrder: order },
    });
  }
}
