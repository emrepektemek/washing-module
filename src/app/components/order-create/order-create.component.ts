import { Component, OnInit } from '@angular/core';
import { PantState } from '../../store/pant.state';
import { WashingTypeState } from '../../store/washing-type.state';
import { PantFabricModel } from '../../models/pantFabricModel';
import { WashingType } from '../../models/washingType';
import { take } from 'rxjs';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css'],
})
export class OrderCreateComponent implements OnInit {
  pants: PantFabricModel[] = [];
  filteredPants: PantFabricModel[] = [];
  washingTypes: WashingType[] = [];

  modelSearch: string = '';
  selectedModelId: number = 0;
  selectedWashingType: string = '';
  selectedWashingTypeId: number = 0;
  pantQuantity: number = 0;

  dataLoaded: boolean = false;
  dataAdd: boolean = true;

  constructor(
    private pantState: PantState,
    private washingTypeState: WashingTypeState,
    private orderService: OrderService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    forkJoin({
      pants: this.pantState.pants$.pipe(take(1)),
      washingTypes: this.washingTypeState.washingTypes$.pipe(take(1)),
    }).subscribe(({ pants, washingTypes }) => {
      this.pants = pants;
      this.washingTypes = washingTypes;
      this.dataLoaded = true;
      this.filteredPants = this.pants;
    });
  }

  filterModels(): void {
    if (this.modelSearch) {
      this.filteredPants = this.pants.filter((pant) =>
        pant.modelName.toLowerCase().includes(this.modelSearch.toLowerCase())
      );
    } else {
      this.filteredPants = this.pants;
    }
  }

  selectModel(pant: PantFabricModel): void {
    this.selectedModelId = pant.id;
    this.modelSearch = pant.modelName;
    this.filteredPants = [];
  }

  selectWashingType(washingTypeName: string, washingTypeId: number): void {
    this.selectedWashingType = washingTypeName;
    this.selectedWashingTypeId = washingTypeId;
  }

  clearWashingType(): void {
    this.selectedWashingType = '';
    this.selectedWashingTypeId = 0;
  }

  createOrder(): void {
    let orderObject = {
      pantId: this.selectedModelId,
      washingTypeId: this.selectedWashingTypeId,
      pantQuantity: this.pantQuantity,
    };

    this.dataAdd = false;

    this.orderService.add(orderObject).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.modelSearch = '';
        this.selectedModelId = 0;
        this.selectedWashingType = '';
        this.selectedWashingTypeId = 0;
        this.pantQuantity = 0;
        this.dataAdd = true;
      },
      (responseError) => {
        this.dataAdd = true;
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
}
