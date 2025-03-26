import { Component, OnInit } from '@angular/core';
import { OrderPantModel } from '../../models/orderPantModel';
import { OrderState } from '../../store/order.state';
import { forkJoin, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-pant-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-pant-list.component.html',
  styleUrl: './order-pant-list.component.css',
})
export class OrderPantListComponent implements OnInit {
  orders: OrderPantModel[] = [];
  filteredOrders: OrderPantModel[] = [];

  searchOrder: string = '';

  dataLoaded: boolean = false;

  constructor(private orderState: OrderState) {}

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
      this.filteredOrders = this.orders.filter((order) =>
        order.orderNumber.toLowerCase().includes(this.searchOrder.toLowerCase())
      );
    } else {
      this.filteredOrders = this.orders;
    }
  }
}
