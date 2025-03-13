import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { OrderApproveState } from '../../store/order-approve.state';
import { OrderApproveRejectModel } from '../../models/orderApproveRejectModel';
import { OrderService } from '../../services/order.service';
import { InventoryReportModel } from '../../models/inventoryReportModel';
import { InventoryReportState } from '../../store/inventory-report.state';
import { take } from 'rxjs';
import { OrderApproveAcceptModel } from '../../models/orderApproveAcceptModel';

declare var bootstrap: any;

@Component({
  selector: 'app-order-approve',
  imports: [CommonModule],
  templateUrl: './order-approve.component.html',
  styleUrl: './order-approve.component.css',
})
export class OrderApproveComponent implements OnInit {
  orderId: number = 0;
  userId: string | null = null;
  selectedProductId: number = 0;
  selectedQuantity: number = 0;
  inventoryReports: InventoryReportModel[] = [];
  filteredInventory: InventoryReportModel[] = [];
  selectedWarehouseId: number = 0;
  selectedWarehouseLocation: string = '';
  isApproved: boolean = true;
  dataLoaded: boolean = false;
  acceptModalElement: any;
  rejectModalElement: any;

  dataUpdated: boolean = true;

  constructor(
    private toastrService: ToastrService,
    public orderApproveState: OrderApproveState,
    private orderService: OrderService,
    private inventoryReportState: InventoryReportState
  ) {}

  ngOnInit(): void {
    this.inventoryReportState.inventoryReports$
      .pipe(take(1))
      .subscribe((reports) => {
        this.inventoryReports = reports;
        this.dataLoaded = true;
      });

    this.acceptModalElement = new bootstrap.Modal(
      document.getElementById('acceptModal')!
    );

    this.rejectModalElement = new bootstrap.Modal(
      document.getElementById('rejectModal')!
    );

    this.userId = localStorage.getItem('userId');
  }

  openAcceptModal(orderId: number, productId: number, quantity: number) {
    this.orderId = orderId;
    this.selectedProductId = productId;
    this.selectedQuantity = quantity;
    this.isApproved = true;

    this.filteredInventory = this.inventoryReports.filter(
      (item) => item.productId == Number(productId)
    );

    this.acceptModalElement.show();
  }

  openRejectModal(orderId: number) {
    this.orderId = orderId;
    this.isApproved = false;
    this.rejectModalElement.show();
  }

  selectWarehouse(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedWarehouseId = Number(target.value);

    const selectedWarehouse = this.filteredInventory.find(
      (warehouse) => warehouse.warehouseId === this.selectedWarehouseId
    );

    this.selectedWarehouseLocation = selectedWarehouse
      ? selectedWarehouse.warehouseLocation
      : 'Warehouse Location';
  }

  acceptOrder() {
    let acceptObject: OrderApproveAcceptModel = {
      id: this.orderId,
      productId: this.selectedProductId,
      warehouseId: this.selectedWarehouseId,
      quantity: this.selectedQuantity,
      isApproved: this.isApproved,
      lastUpdatedUserId: this.userId,
    };
    console.log(acceptObject);

    this.dataUpdated = false;

    this.orderService.approveAccept(acceptObject).subscribe(
      (response) => {
        this.toastrService.info(response.message);

        this.orderApproveState.delete(this.orderId);

        this.acceptModalElement.hide();
        this.dataUpdated = true;
      },
      (responseError) => {
        this.dataUpdated = true;

        if (responseError.error.ValidationErrors) {
          this.toastrService.error(
            responseError.error.ValidationErrors[0].ErrorMessage
          );
          this.rejectModalElement.hide();
        } else {
          this.toastrService.error(responseError.error.message);
          this.rejectModalElement.hide();
        }
      }
    );
  }

  rejectOrder() {
    let rejectObject: OrderApproveRejectModel = {
      id: this.orderId,
      isApproved: this.isApproved,
      lastUpdatedUserId: this.userId,
    };
    this.dataUpdated = false;
    this.orderService.approveReject(rejectObject).subscribe(
      (response) => {
        this.toastrService.info(response.message);

        this.orderApproveState.delete(this.orderId);

        this.rejectModalElement.hide();
        this.dataUpdated = true;
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message);
        this.rejectModalElement.hide();

        this.dataUpdated = true;
      }
    );
  }
}
