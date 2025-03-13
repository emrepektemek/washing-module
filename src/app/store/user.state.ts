import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserOperationAssignmentModel } from '../models/userOperationAssignmentModel';
import { roleMap } from '../constants/role-map';

@Injectable({
  providedIn: 'root',
})
export class UserState {
  private users = new BehaviorSubject<UserOperationAssignmentModel[]>([]);

  users$ = this.users.asObservable();

  userRoles = roleMap;

  setUsers(users: UserOperationAssignmentModel[]) {
    this.users.next(users);
  }

  updateUserRole(userId: number, operationClaimId: number) {
    const currentUsers = this.users.getValue();
    const updatedUsers = currentUsers.map((user) =>
      user.userId === userId
        ? {
            ...user,
            operationClaimId,
            operationClaimName: this.getRoleName(operationClaimId),
            isDeleted: false,
          }
        : user
    );

    this.users.next([...updatedUsers]);
  }

  deleteUserRole(userId: number) {
    const currentUsers = this.users.getValue();
    const updatedUsers = currentUsers.map((user) =>
      user.userId === userId ? { ...user, isDeleted: true } : user
    );

    this.users.next([...updatedUsers]);
  }

  clearUsers(): void {
    this.users.next([]);
  }

  getRoleName(role: number): string {
    return this.userRoles[role] || this.userRoles[0];
  }
}
