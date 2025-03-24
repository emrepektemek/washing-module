import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PantFabricModel } from '../models/pantFabricModel';

@Injectable({
  providedIn: 'root',
})
export class PantState {
  private pants = new BehaviorSubject<PantFabricModel[]>([]);

  pants$ = this.pants.asObservable();

  setPants(reports: PantFabricModel[]) {
    this.pants.next(reports);
  }

  clearPants(): void {
    this.pants.next([]);
  }
}
