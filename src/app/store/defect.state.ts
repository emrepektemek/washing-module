import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DefectWithCategoryModel } from '../models/defectWithCategoryModel';

@Injectable({
  providedIn: 'root',
})
export class DefectState {
  private defects = new BehaviorSubject<DefectWithCategoryModel[]>([]);

  defects$ = this.defects.asObservable();

  setDefects(reports: DefectWithCategoryModel[]) {
    this.defects.next(reports);
  }

  clearDefects(): void {
    this.defects.next([]);
  }
}
