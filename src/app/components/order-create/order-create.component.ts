import { Component, OnInit } from '@angular/core';
import { PantState } from '../../store/pant.state';
import { PantFabricModel } from '../../models/pantFabricModel';
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

  modelSearch: string = '';
  selectedModelId: number = 0;
  pantQuantity: number = 0;

  dataLoaded: boolean = false;
  dataAdd: boolean = true;

  constructor(
    private pantState: PantState,
    private orderService: OrderService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    forkJoin({
      pants: this.pantState.pants$.pipe(take(1)),
    }).subscribe(({ pants }) => {
      this.pants = pants;
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

  createOrder(): void {
    let orderObject = {
      pantId: this.selectedModelId,
      pantQuantity: this.pantQuantity,
    };

    this.dataAdd = false;

    this.orderService.add(orderObject).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.modelSearch = '';
        this.selectedModelId = 0;
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
