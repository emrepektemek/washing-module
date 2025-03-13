import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { CustomerService } from './../../services/customer.service';
import { CommonModule } from '@angular/common';
import { UserForCustomerModel } from '../../models/userForCustomerModel';
import { UserForCustomerState } from '../../store/user-for-customer.state';

@Component({
  selector: 'app-customer-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.css',
})
export class CustomerCreateComponent implements OnInit {
  userId: string | null = null;
  customerForm: FormGroup;
  dataAdd: boolean = true;
  userForCustomer: UserForCustomerModel[] = [];
  selectedUserId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private usersForCustomerState: UserForCustomerState
  ) {}

  ngOnInit() {
    this.createCustomerForm();

    this.userId = localStorage.getItem('userId');

    this.usersForCustomerState.usersCustomer$.subscribe((userForCustomers) => {
      this.userForCustomer = userForCustomers;
    });
  }

  createCustomerForm() {
    this.customerForm = this.formBuilder.group({
      userId: [0, [Validators.required]],
      customerName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  onEmailChange(event: Event): void {
    const selectedEmail = (event.target as HTMLSelectElement).value;

    const selectedUser = this.userForCustomer.find(
      (user) => user.email === selectedEmail
    );

    this.selectedUserId = selectedUser?.id;
    if (selectedUser) {
      this.customerForm.patchValue({
        userId: selectedUser.id,
        email: selectedUser.email,
        customerName: selectedUser.firstName + ' ' + selectedUser.lastName,
        phoneNumber: selectedUser.phoneNumber,
      });
    }
  }

  createCustomer() {
    let customerModel = Object.assign({}, this.customerForm.value, {
      userId: this.selectedUserId,
      createdUserId: this.userId,
    });

    console.log(customerModel);

    this.dataAdd = false;
    this.customerService.add(customerModel).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.customerForm.setValue({
          userId: 0,
          customerName: '',
          email: '',
          address: '',
          phoneNumber: '',
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
}
