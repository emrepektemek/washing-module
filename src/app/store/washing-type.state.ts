import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WashingType } from '../models/washingType';

@Injectable({
  providedIn: 'root',
})
export class WashingTypeState {
  private washingTypes = new BehaviorSubject<WashingType[]>([]);

  washingTypes$ = this.washingTypes.asObservable();

  setWashingType(reports: WashingType[]) {
    this.washingTypes.next(reports);
  }

  clearWashingType(): void {
    this.washingTypes.next([]);
  }
}
