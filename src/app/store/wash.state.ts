import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WashList } from '../models/washListModel';

@Injectable({
  providedIn: 'root',
})
export class WashState {
  private washes = new BehaviorSubject<WashList[]>([]);

  washes$ = this.washes.asObservable();

  setWashes(reports: WashList[]) {
    this.washes.next(reports);
  }

  clearWashes(): void {
    this.washes.next([]);
  }
}
