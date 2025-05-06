import { Component, OnInit } from '@angular/core';
import { OrderPantModel } from '../../models/orderPantModel';
import { OrderDefectWithDefectAndOrderModel } from '../../models/orderDefectWithDefectAndOrderModel';
import { forkJoin, map, take } from 'rxjs';
import { OrderDefectState } from '../../store/order-defect.state';
import { CommonModule } from '@angular/common';
import { DefectWithCategoryModel } from '../../models/defectWithCategoryModel';
import { DefectState } from '../../store/defect.state';

import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { OrderDefectService } from '../../services/order-defect.service';
import { OrderDefectAddModel } from '../../models/orderDefectAddModel';

@Component({
  selector: 'app-quality-control',
  imports: [CommonModule],
  templateUrl: './quality-control.component.html',
  styleUrl: './quality-control.component.css',
  animations: [
    trigger('rowTransition', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      state('out', style({ opacity: 0, transform: 'translateX(-50px)' })),
      transition('in => out', [animate('300ms ease-in')]),
      transition('out => in', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate('300ms ease-out'),
      ]),
    ]),
  ],
})
export class QualityControlComponent implements OnInit {
  selectedOrder: OrderPantModel;

  animationState = 'in';

  defects: DefectWithCategoryModel[] = [];
  orderDefects: OrderDefectWithDefectAndOrderModel[] = [];

  currentIndex: number = 0;
  selectedDefectId: number = 0;
  selectedDesicion: string = '';

  dataLoaded: boolean = false;
  dataAdded: boolean = true;

  constructor(
    private orderDefectState: OrderDefectState,
    private defectState: DefectState,
    private orderDefectService: OrderDefectService,
    private toastrService: ToastrService
  ) {}

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
      defetcs: this.defectState.defects$.pipe(take(1)),
    }).subscribe(({ orderDefects, defetcs }) => {
      this.orderDefects = orderDefects;
      this.defects = defetcs;
      this.nextRow();
      console.log(this.orderDefects);
      this.dataLoaded = true;
    });
  }

  nextRow() {
    do {
      this.currentIndex++;
    } while (
      this.currentIndex <= this.selectedOrder.pantQuantity &&
      this.orderDefects.some((d) => d.rowNumber === this.currentIndex)
    );
  }

  selectDefect(defectId: number, defectCategoryId: number) {
    this.selectedDefectId = defectId;

    if (defectCategoryId === 4) {
      this.selectedDesicion = 'Accept';
    } else {
      this.selectedDesicion = 'Reject';
    }
  }

  saveDecision() {
    let orderDefectObject: OrderDefectAddModel = {
      orderId: this.selectedOrder.id,
      defectId: this.selectedDefectId,
      rowNumber: this.currentIndex,
      decision: this.selectedDesicion,
    };

    this.dataAdded = false;

    this.animationState = 'out';
    setTimeout(() => {
      this.orderDefectService.add(orderDefectObject).subscribe(
        (response) => {
          this.toastrService.info(response.message);
          this.clearSelectedValues();

          this.dataAdded = true;
        },
        (responseError) => {
          this.dataAdded = true;
          if (responseError.error.ValidationErrors) {
            this.toastrService.error(
              responseError.error.ValidationErrors[0].ErrorMessage
            );
          } else {
            this.toastrService.error(responseError.error.message);
          }
        }
      );

      this.nextRow();
      this.checkIfAllDecisionsMade();
      this.animationState = 'in';
    }, 250);
  }

  checkIfAllDecisionsMade() {
    const decidedCount = this.currentIndex;
    const totalCount = this.selectedOrder.pantQuantity;

    console.log(decidedCount);
    console.log(totalCount);

    if (decidedCount > totalCount) {
      location.reload();
    }
  }

  clearSelectedValues(): void {
    this.selectedDefectId = 0;
    this.selectedDesicion = '';
  }
}
