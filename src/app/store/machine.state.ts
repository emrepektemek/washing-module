import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Machine } from '../models/machine';

@Injectable({
  providedIn: 'root',
})
export class MachineState {
  private machines = new BehaviorSubject<Machine[]>([]);

  machines$ = this.machines.asObservable();

  setMachines(reports: Machine[]) {
    this.machines.next(reports);
  }

  clearMachines(): void {
    this.machines.next([]);
  }
}
