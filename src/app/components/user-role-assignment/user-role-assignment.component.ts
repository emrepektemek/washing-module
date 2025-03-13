import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOperationAssignmentModel } from '../../models/userOperationAssignmentModel';
import { UserOperationAssignmentUpdateModel } from '../../models/userOperationAssignmentUpdateModel';
import { UserOperationClaimService } from '../../services/userOperationClaimService';
import { roleMap } from '../../constants/role-map';
import { ToastrService } from 'ngx-toastr';
import { UserOperationAssignmentDeleteModel } from '../../models/userOperationAssignmentDeleteModel';

import { take } from 'rxjs';
import { UserState } from '../../store/user.state';

declare var bootstrap: any;

@Component({
  selector: 'app-user-role-assignment',
  imports: [CommonModule],
  templateUrl: './user-role-assignment.component.html',
  styleUrl: './user-role-assignment.component.css',
})
export class UserRoleAssignmentComponent implements OnInit {
  selectedUserClaimOperationId: number = 0;
  selectedRole: number = 0;
  selectedUserId: number = 0;
  selecteOperationClaimId: number = 0;
  userId: string | null = null;
  updateModalElement: any;
  deleteModalElement: any;
  userRoles = roleMap;
  dataUpdated: boolean = true;
  dataDeleted: boolean = true;

  constructor(
    private userOperationClaimService: UserOperationClaimService,
    private toastrService: ToastrService,
    public userState: UserState
  ) {}

  ngOnInit(): void {
    this.updateModalElement = new bootstrap.Modal(
      document.getElementById('userOperationClaimUpdateModal')!
    );
    this.deleteModalElement = new bootstrap.Modal(
      document.getElementById('userOperationClaimDeleteModal')!
    );

    this.userId = localStorage.getItem('userId');
  }

  openUpdateModal(userOperationClaimId: number, userId: number) {
    this.selectedUserClaimOperationId = userOperationClaimId;
    this.selectedUserId = userId;
    this.updateModalElement.show();
  }

  openDeleteModal(
    userOperationClaimId: number,
    userId: number,
    operationClaimId: number
  ) {
    this.selectedUserClaimOperationId = userOperationClaimId;
    this.selectedUserId = userId;
    this.selecteOperationClaimId = operationClaimId;
    this.deleteModalElement.show();
  }

  selectRole(role: number): void {
    this.selectedRole = role;
  }

  getRoleName(role: number): string {
    return this.userRoles[role] || this.userRoles[0];
  }

  saveRole() {
    this.dataUpdated = false;

    if (this.selectedRole == 0) {
      this.toastrService.error('Please select a role ');

      this.dataUpdated = true;
      return;
    }

    let updateObject: UserOperationAssignmentUpdateModel = {
      id: this.selectedUserClaimOperationId,
      userId: this.selectedUserId,
      operationClaimId: this.selectedRole,
      status: true,
      isDeleted: false,
      lastUpdatedUserId: this.userId,
    };

    this.userOperationClaimService.update(updateObject).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.userState.updateUserRole(this.selectedUserId, this.selectedRole);

        this.updateModalElement.hide();

        this.dataUpdated = true;
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message);
        this.updateModalElement.hide();
        this.dataUpdated = true;
      }
    );
  }

  deleteRole() {
    this.dataDeleted = false;
    let deleteObject: UserOperationAssignmentDeleteModel = {
      id: this.selectedUserClaimOperationId,
      userId: this.selectedUserId,
      operationClaimId: this.selecteOperationClaimId,
      status: true,
      isDeleted: true,
      lastUpdatedUserId: this.userId,
    };

    this.userOperationClaimService.delete(deleteObject).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.userState.deleteUserRole(this.selectedUserId);

        this.deleteModalElement.hide();
        this.dataDeleted = true;
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message);
        this.deleteModalElement.hide();

        this.dataDeleted = true;
      }
    );
  }
}
