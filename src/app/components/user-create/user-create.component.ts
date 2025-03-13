import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { roleMap } from '../../constants/role-map';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent implements OnInit {
  registerForm: FormGroup;
  userId: string | null = null;
  selectedRole: number = 0;
  selectedGender: string = '';
  dataAdd: boolean = true;

  userRoles = roleMap;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}
  ngOnInit() {
    this.createRegisterForm();
    this.userId = localStorage.getItem('userId');
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [''],
      gender: [''],
    });
  }

  selectGender(gender: string): void {
    this.selectedGender = gender;
    this.registerForm.patchValue({ gender });
  }

  getRoleName(role: number): string {
    return this.userRoles[role] || this.userRoles[0];
  }

  selectRole(role: number): void {
    this.selectedRole = role;
  }

  register() {
    let registerModel = Object.assign({}, this.registerForm.value, {
      createdUserId: this.userId,
      operationClaimId: this.selectedRole,
    });

    this.dataAdd = false;

    this.authService.adminRegister(registerModel).subscribe(
      (response) => {
        this.toastrService.info(response.message);

        this.registerForm.setValue({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          gender: '',
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
          this.toastrService.error(responseError.error);
        }
      }
    );
  }
}
