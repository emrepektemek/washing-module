import { Component, OnInit } from '@angular/core';
import { OrderReportModel } from './../../models/orderReportModel';
import { CommonModule } from '@angular/common';
import { OrderReportState } from './../../store/order-report.state';

import { take } from 'rxjs';
import { UserOrderReportModel } from '../../models/userOrderReportModel';
import { UserOrderState } from '../../store/user-order.state';

@Component({
  selector: 'app-user-order-history',
  imports: [CommonModule],
  templateUrl: './user-order-history.component.html',
  styleUrl: './user-order-history.component.css',
})
export class UserOrderHistoryComponent implements OnInit {
  userOrderReports: UserOrderReportModel[] = [];
  dataLoaded: boolean = false;

  constructor(private userOrderState: UserOrderState) {}

  ngOnInit(): void {
    this.userOrderState.userOrders$.pipe(take(1)).subscribe((data) => {
      this.userOrderReports = data;

      this.dataLoaded = true;
    });
    console.log(this.userOrderReports);
  }
}
