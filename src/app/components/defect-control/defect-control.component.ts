import { Component, OnInit } from '@angular/core';
import { OrderPantModel } from '../../models/orderPantModel';
import { DefectWithCategoryModel } from '../../models/defectWithCategoryModel';
import { DefectState } from '../../store/defect.state';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, map, take } from 'rxjs';
import { OrderDefectState } from '../../store/order-defect.state';
import { CommonModule } from '@angular/common';
import { OrderDefectWithDefectAndOrderModel } from '../../models/orderDefectWithDefectAndOrderModel';
import { OrderDefectAddModel } from '../../models/orderDefectAddModel';
import { OrderDefectService } from '../../services/order-defect.service';
import { clear } from 'node:console';

declare var bootstrap: any;

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

  selectedDesicion: string = '';
  selectedOrderDefectIndex: number = 0;
  selectedDefectName: string = '';
  selectedDefectId: number = 0;

  acceptModalElement: any;
  rejectModalElement: any;

  dataLoaded: boolean = false;
  dataAdded: boolean = true;

  constructor(
    private defectState: DefectState,
    private orderDefectState: OrderDefectState,
    private orderDefectService: OrderDefectService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.selectedOrder = history.state.selectedOrder;

    console.log('selectedOrder', this.selectedOrder);

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
      console.log('orderDefects', orderDefects);
      console.log('defetcs', defetcs);

      const pantQuantity = this.selectedOrder.pantQuantity || 0;

      this.displayedDefects = Array(pantQuantity).fill(null);

      this.orderDefects.forEach((orderDefect) => {
        const index = orderDefect.rowNumber - 1;
        if (index >= 0 && index < pantQuantity) {
          this.displayedDefects[index] = orderDefect;
        }
      });

      this.dataLoaded = true;
    });

    this.acceptModalElement = new bootstrap.Modal(
      document.getElementById('acceptModal')!
    );

    this.rejectModalElement = new bootstrap.Modal(
      document.getElementById('rejectModal')!
    );
  }

  showMessage(message: string) {
    this.toastrService.info(message, '', {
      positionClass: 'toast-bottom-left',
      timeOut: 4000,
      closeButton: true,
    });
  }

  selectDesicion(desicion: string, selectedOrderDefectIndex: number) {
    this.selectedDesicion = desicion;
    this.selectedOrderDefectIndex = selectedOrderDefectIndex;

    if (desicion == 'Accept') {
      this.acceptModalElement.show();
    } else if (desicion == 'Reject') {
      this.rejectModalElement.show();
    }
  }

  selectDefect(name: string, id: number): void {
    this.selectedDefectName = name;
    this.selectedDefectId = id;
  }

  clearDefectSelection(): void {
    this.selectedDefectName = '';
    this.selectedDefectId = 0;
  }

  getDefectsForModal(
    modalType: 'accept' | 'reject'
  ): DefectWithCategoryModel[] {
    if (modalType === 'accept') {
      return this.defects.filter((d) => d.defectCategoryId === 4);
    } else {
      return this.defects.filter((d) => [1, 2, 3].includes(d.defectCategoryId));
    }
  }

  addOrderDefetc(): void {
    let orderDefectObject: OrderDefectAddModel = {
      orderId: this.selectedOrder.id,
      defectId: this.selectedDefectId,
      rowNumber: this.selectedOrderDefectIndex + 1,
      decision: this.selectedDesicion,
    };

    this.dataAdded = false;

    this.orderDefectService.add(orderDefectObject).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.clearSelectedValues();
        this.acceptModalElement.hide();
        this.rejectModalElement.hide();
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
  }

  clearSelectedValues(): void {
    this.selectedDefectId = 0;
    this.selectedOrderDefectIndex = 0;
    this.selectedDesicion = '';
    this.selectedDefectName = '';
  }
}
