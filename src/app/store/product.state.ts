import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductState {
  private product = new BehaviorSubject<Product[]>([]);

  products$ = this.product.asObservable();

  setProduct(product: Product[]) {
    this.product.next(product);
  }

  clearProduct(): void {
    this.product.next([]);
  }
}
