import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerState {
  private customer = new BehaviorSubject<Customer[]>([]);

  customers$ = this.customer.asObservable();

  setCustomer(customer: Customer[]) {
    this.customer.next(customer);
  }

  clearCustomer(): void {
    this.customer.next([]);
  }

  setCustomerId(): Observable<number | null> {
    const userId = localStorage.getItem('userId');
    const claim = localStorage.getItem('claim');

    const userIdInt = Number(userId);

    return new Observable((observer) => {
      if (userId !== null && claim === 'user') {
        const selectedCustomer = this.customer
          .getValue()
          .find((customer) => customer.userId === userIdInt);

        if (selectedCustomer) {
          localStorage.setItem('customerId', selectedCustomer.id.toString());
          localStorage.setItem('customerAddress', selectedCustomer.address);
          observer.next(selectedCustomer.id);
          observer.complete();
        } else {
          observer.error('Müşteri bulunamadı.');
        }
      } else {
        observer.error('UserId veya claim hatalı.');
      }
    });
  }
}
