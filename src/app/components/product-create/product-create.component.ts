import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { ProductService } from './../../services/product.service';

import { sizeMap } from '../../constants/size-map';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category';
import { CategoryState } from '../../store/category.state';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule, CommonModule],

  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent implements OnInit {
  userId: string | null = null;
  selectedSize: number = 0;
  productForm: FormGroup;
  sizes = sizeMap;
  dataAdd: boolean = true;
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private productService: ProductService,
    private categoryState: CategoryState
  ) {}

  ngOnInit() {
    this.createProductForm();
    this.userId = localStorage.getItem('userId');

    this.categoryState.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  selectSize(size: number): void {
    this.selectedSize = size;
    this.productForm.patchValue({ size });
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      categoryId: [0, [Validators.required]],
      productName: ['', [Validators.required]],
      unitPrice: [0.0, [Validators.required]],
      size: [0, [Validators.required]],
      description: [''],
    });
  }

  createProduct() {
    let productModel = Object.assign({}, this.productForm.value, {
      createdUserId: this.userId,
    });

    this.dataAdd = false;
    this.productService.add(productModel).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.productForm.setValue({
          categoryId: 0,
          productName: '',
          unitPrice: 0.0,
          size: 0,
          description: '',
        });
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

  getSizeName(role: number): string {
    return this.sizes[role] || this.sizes[0];
  }
}
