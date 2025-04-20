import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QualityControl } from '../models/qualityControl';

@Injectable({
  providedIn: 'root',
})
export class QualityControlState {
  private qualityControls = new BehaviorSubject<QualityControl[]>([]);

  qualityControls$ = this.qualityControls.asObservable();

  setQualityControl(reports: QualityControl[]) {
    this.qualityControls.next(reports);
  }

  clearQualityControl(): void {
    this.qualityControls.next([]);
  }
}
