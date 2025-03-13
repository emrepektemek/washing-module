import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category';
import { UserForCustomerModel } from '../models/userForCustomerModel';

@Injectable({
  providedIn: 'root',
})
export class UserForCustomerState {
  private usersCustomer = new BehaviorSubject<UserForCustomerModel[]>([]);

  usersCustomer$ = this.usersCustomer.asObservable();

  setUsersForCustomer(usersCustomer: UserForCustomerModel[]) {
    this.usersCustomer.next(usersCustomer);
  }

  clearUsersForCustomer(): void {
    this.usersCustomer.next([]);
  }
}
