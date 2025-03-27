import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Wash } from '../models/wash';

@Injectable({
  providedIn: 'root',
})
export class WashState {
  private washes = new BehaviorSubject<Wash[]>([]);

  washes$ = this.washes.asObservable();

  setWashes(reports: Wash[]) {
    this.washes.next(reports);
  }

  clearWashes(): void {
    this.washes.next([]);
  }
}
