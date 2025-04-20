import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderDefectWithDefectAndOrderModel } from '../../models/orderDefectWithDefectAndOrderModel';
import { OrderDefectState } from '../../store/order-defect.state';
import { OrderPantModel } from '../../models/orderPantModel';
import { forkJoin, map, take } from 'rxjs';
import {
  NgApexchartsModule,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexLegend,
  ApexDataLabels,
} from 'ng-apexcharts';

@Component({
  selector: 'app-quality-control-summary',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './quality-control-summary.component.html',
  styleUrl: './quality-control-summary.component.css',
})
export class QualityControlSummaryComponent implements OnInit {
  selectedOrder: OrderPantModel;

  orderDefects: OrderDefectWithDefectAndOrderModel[] = [];

  acceptCount: number = 0;
  rejectCount: number = 0;
  notDecidedCount: number = 0;

  acceptPercentage: number = 0;
  rejectPercentage: number = 0;
  notDecidedPercentage: number = 0;

  totalPantQuantity: number = 0;

  chartSeries: ApexNonAxisChartSeries = [];
  chartLabels: string[] = ['Accept', 'Reject', 'Not Decided'];
  chartOptions: {
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: string[];
    legend: ApexLegend;
    dataLabels: ApexDataLabels;
    colors: string[];
  };

  dataLoaded: boolean = false;

  constructor(private orderDefectState: OrderDefectState) {}

  ngOnInit() {
    this.selectedOrder = history.state.selectedOrder;

    forkJoin({
      orderDefects: this.orderDefectState.orderDefects$.pipe(
        take(1),
        map((orderDefects) =>
          orderDefects.filter(
            (orderDefect) => orderDefect.orderId === this.selectedOrder.id
          )
        )
      ),
    }).subscribe(({ orderDefects }) => {
      this.orderDefects = orderDefects;

      this.totalPantQuantity = this.selectedOrder.pantQuantity ?? 0;

      this.acceptCount = this.orderDefects.filter(
        (d) => d.decision === 'Accept'
      ).length;
      this.rejectCount = this.orderDefects.filter(
        (d) => d.decision === 'Reject'
      ).length;
      this.notDecidedCount =
        this.totalPantQuantity - this.acceptCount - this.rejectCount;

      this.acceptPercentage = Math.round(
        (this.acceptCount / this.totalPantQuantity) * 100
      );
      this.rejectPercentage = Math.round(
        (this.rejectCount / this.totalPantQuantity) * 100
      );
      this.notDecidedPercentage =
        100 - this.acceptPercentage - this.rejectPercentage;

      console.log('orderDefects', orderDefects);

      this.chartSeries = [
        this.acceptPercentage,
        this.rejectPercentage,
        this.notDecidedPercentage,
      ];

      this.chartOptions = {
        chart: {
          type: 'donut',
          width: 310,
        },
        labels: this.chartLabels,
        colors: ['#00bf06', '#c90014', '#a6a6a6'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 320,
              },
              legend: {
                show: false,
              },
            },
          },
        ],
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: true,
          formatter: (val: number) => `${val.toFixed(0)}%`,
        },
      };

      this.dataLoaded = true;
    });
  }

  startQualityControl() {
    console.log('Quality control başlatılıyor...');
  }
}
