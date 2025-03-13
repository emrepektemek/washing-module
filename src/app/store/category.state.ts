import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryState {
  private categories = new BehaviorSubject<Category[]>([]);

  categories$ = this.categories.asObservable();

  setCategories(categories: Category[]) {
    this.categories.next(categories);
  }

  clearCategories(): void {
    this.categories.next([]);
  }
}
