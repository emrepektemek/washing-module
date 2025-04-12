import { Component, OnInit } from '@angular/core';
import { OrderPantModel } from '../../models/orderPantModel';
import { DefectWithCategoryModel } from '../../models/defectWithCategoryModel';
import { DefectState } from '../../store/defect.state';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, map, take } from 'rxjs';
import { OrderDefectState } from '../../store/order-defect.state';
import { CommonModule } from '@angular/common';
import { OrderDefectWithDefectAndOrderModel } from '../../models/orderDefectWithDefectAndOrderModel';

@Component({
  selector: 'app-defect-control',
  imports: [CommonModule],
  templateUrl: './defect-control.component.html',
  styleUrl: './defect-control.component.css',
})
export class DefectControlComponent implements OnInit {
  defects: DefectWithCategoryModel[] = [];
  orderDefects: OrderDefectWithDefectAndOrderModel[] = [];
  displayedDefects: (OrderDefectWithDefectAndOrderModel | null)[] = [];

  selectedOrder: OrderPantModel;
  selectedMessage: string | null = null;
  timeoutRef: any;

  dataLoaded: boolean = false;

  constructor(
    private defectState: DefectState,
    private orderDefectState: OrderDefectState,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
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
      defetcs: this.defectState.defects$.pipe(take(1)),
    }).subscribe(({ orderDefects, defetcs }) => {
      this.orderDefects = orderDefects;
      this.defects = defetcs;

      const pantQuantity = this.selectedOrder.pantQuantity || 0;

      this.displayedDefects = Array(pantQuantity).fill(null);

      this.orderDefects.forEach((orderDefect) => {
        const index = orderDefect.rowNumber - 1;
        if (index >= 0 && index < pantQuantity) {
          this.displayedDefects[index] = orderDefect;
        }
      });

      console.log('displayedDefects', this.displayedDefects);
      console.log('orderDefects', this.orderDefects);
      this.dataLoaded = true;
    });
  }

  showMessage(message: string) {
    this.toastrService.info(message, '', {
      positionClass: 'toast-bottom-left',
      timeOut: 3000,
      closeButton: true,
    });
  }
}
