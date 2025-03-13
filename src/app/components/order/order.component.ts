import { Component, OnInit } from '@angular/core';
import { OrderReportModel } from './../../models/orderReportModel';
import { CommonModule } from '@angular/common';
import { OrderReportState } from './../../store/order-report.state';

import { FormsModule } from '@angular/forms';

import { take } from 'rxjs';

@Component({
  selector: 'app-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  orderReports: OrderReportModel[] = [];
  searchText: string = '';
  dataLoaded: boolean = false;

  constructor(private orderReportState: OrderReportState) {}

  ngOnInit(): void {
    this.orderReportState.orderReports$.pipe(take(1)).subscribe((reports) => {
      this.orderReports = reports;
      this.dataLoaded = true;
    });
  }

  get filteredOrders(): OrderReportModel[] {
    if (!this.searchText) {
      return this.orderReports;
    }

    const lowerCaseSearch = this.searchText.toLowerCase();

    return this.orderReports.filter((order) => {
      return (
        order.customerName.toLowerCase().includes(lowerCaseSearch) ||
        order.customerEmail.toLowerCase().includes(lowerCaseSearch) ||
        order.customerAddress.toLowerCase().includes(lowerCaseSearch) ||
        order.customerPhoneNumber.includes(lowerCaseSearch) ||
        order.productName.toLowerCase().includes(lowerCaseSearch)
      );
    });
  }
}
