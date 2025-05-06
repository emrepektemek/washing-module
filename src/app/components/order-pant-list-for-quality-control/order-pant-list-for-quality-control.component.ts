import { Component, OnInit } from '@angular/core';
import { OrderPantModel } from '../../models/orderPantModel';
import { OrderState } from '../../store/order.state';
import { forkJoin, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QualityControlState } from '../../store/quality-control.state';
import { QualityControl } from '../../models/qualityControl';

@Component({
  selector: 'app-order-pant-list-for-quality-control',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-pant-list-for-quality-control.component.html',
  styleUrl: './order-pant-list-for-quality-control.component.css',
})
export class OrderPantListForQualityControlComponent implements OnInit {
  orders: OrderPantModel[] = [];
  filteredOrders: OrderPantModel[] = [];
  qualityControls: QualityControl[] = [];

  searchOrder: string = '';

  dataLoaded: boolean = false;

  constructor(
    private orderState: OrderState,
    private qualityControlState: QualityControlState,
    private router: Router
  ) {}

  ngOnInit(): void {
    forkJoin({
      orders: this.orderState.orders$.pipe(take(1)),
      qualityControls: this.qualityControlState.qualityControls$.pipe(take(1)),
    }).subscribe(({ orders, qualityControls }) => {
      this.orders = orders;
      this.qualityControls = qualityControls;
      this.filteredOrders = this.orders;
      console.log(qualityControls);
      this.dataLoaded = true;
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
    const selectedQualityControl = this.qualityControls.find(
      (qc) => qc.orderId === order.id
    );

    this.router.navigate(['/home/quality-control-summary'], {
      state: {
        selectedOrder: order,
        selectedQualityControl: selectedQualityControl,
      },
    });
  }

  getQualityControlResult(orderId: number): string {
    const control = this.qualityControls.find((qc) => qc.orderId === orderId);
    if (!control || !control.result) {
      return 'Not Finished';
    }
    return control.result;
  }
}
