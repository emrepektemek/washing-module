import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductState } from '../../store/product.state';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-user-order',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-order.component.html',
  styleUrl: './user-order.component.css',
})
export class UserOrderComponent implements OnInit {
  userId: number = 0;
  customerId: number = 0;
  customerAddress: string | null = '';
  selectedQuantity: number = 0;
  quantityOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  orderForm: FormGroup;
  dataAdd: boolean = true;

  products: Product[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private productState: ProductState,
    private orderService: OrderService
  ) {}
  ngOnInit(): void {
    this.createOrderForm();
    let userId = localStorage.getItem('userId');

    let customerId = localStorage.getItem('customerId');

    this.customerAddress = localStorage.getItem('customerAddress');

    if (userId != null) {
      this.userId = Number(userId);
    }

    if (customerId != null) {
      this.customerId = Number(customerId);
    }

    this.productState.products$.subscribe((product) => {
      this.products = product;
    });
  }

  createOrderForm() {
    this.orderForm = this.formBuilder.group({
      customerId: [0, [Validators.required]],
      productId: [0, [Validators.required]],
    });
  }

  selectQuantity(quantity: number) {
    this.selectedQuantity = quantity;
  }

  createOrder() {
    let orderModel = Object.assign({}, this.orderForm.value, {
      customerId: this.customerId,
      quantity: this.selectedQuantity,
      shippingAddress: this.customerAddress,
      createdUserId: this.userId,
    });

    if (this.customerId == null) {
      this.toastrService.error(
        'Please contact customer representative. You are not currently defined as a customer'
      );
    }

    if (this.userId == null) {
      this.toastrService.error(
        'Please contact customer representative. Your userId not found'
      );
    }

    this.dataAdd = false;

    this.orderService.add(orderModel).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.orderForm.setValue({
          customerId: 0,
          productId: 0,
        });
        this.selectQuantity(0);
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
