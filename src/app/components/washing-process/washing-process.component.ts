import { AfterViewInit, Component, OnInit } from '@angular/core';
import { WashList } from '../../models/washListModel';
import { CommonModule } from '@angular/common';
import { forkJoin, map, take } from 'rxjs';
import { WashState } from '../../store/wash.state';
import { WashingType } from '../../models/washingType';
import { WashingTypeState } from '../../store/washing-type.state';
import { WashCreateModel } from '../../models/washCreateModel';
import { WashService } from '../../services/wash.service';
import { ToastrService } from 'ngx-toastr';
import { Machine } from '../../models/machine';
import { MachineState } from '../../store/machine.state';

declare var bootstrap: any;

@Component({
  selector: 'app-washing',
  imports: [CommonModule],
  templateUrl: './washing-process.component.html',
  styleUrl: './washing-process.component.css',
})
export class WashingComponent implements OnInit, AfterViewInit {
  washes: WashList[] = [];
  washingTypes: WashingType[] = [];
  machines: Machine[] = [];

  orderId: number;
  selectedWashingType: string = '';
  selectedWashingTypeId: number = 0;
  selectedMachineName: string = '';
  selectedMachineId: number = 0;

  selectedShift: string = '';

  washStartModal: any;

  dataLoaded: boolean = false;
  dataAdd: boolean = true;

  constructor(
    private washState: WashState,
    private washingTypeState: WashingTypeState,
    private machineState: MachineState,
    private washService: WashService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.orderId = history.state.orderId;

    forkJoin({
      washes: this.washState.washes$.pipe(
        take(1),
        map((washes) => washes.filter((wash) => wash.orderId === this.orderId))
      ),
      washingTypes: this.washingTypeState.washingTypes$.pipe(take(1)),
      machines: this.machineState.machines$.pipe(take(1)),
    }).subscribe(({ washes, washingTypes, machines }) => {
      this.washes = washes;
      this.washingTypes = washingTypes;
      this.machines = machines;
      console.log(washes);
      this.dataLoaded = true;
    });

    this.washStartModal = new bootstrap.Modal(
      document.getElementById('washStartModal')!
    );
  }

  ngAfterViewInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openWashStartModal() {
    this.washStartModal.show();
  }

  selectWashingType(washingTypeName: string, washingTypeId: number): void {
    this.selectedWashingType = washingTypeName;
    this.selectedWashingTypeId = washingTypeId;
    console.log(washingTypeName, washingTypeId);
  }

  clearWashingType(): void {
    this.selectedWashingType = '';
    this.selectedWashingTypeId = 0;
  }

  selectShift(shift: string): void {
    this.selectedShift = shift;
  }

  selectMachine(machine: Machine): void {
    this.selectedMachineName = machine.machineName;
    this.selectedMachineId = machine.id;
  }

  clearMachine(): void {
    this.selectedMachineName = '';
    this.selectedMachineId = 0;
  }

  isWashInProgress(createdDate: string, washingTime: number): boolean {
    const createdDateObj = new Date(createdDate);
    const washingTimeMs = washingTime * 60 * 1000;
    const endDateObj = new Date(createdDateObj.getTime() + washingTimeMs);
    const currentDate = new Date();

    return endDateObj <= currentDate;
  }

  startWashing(): void {
    let washObject: WashCreateModel = {
      orderId: this.orderId,
      washingTypeId: this.selectedWashingTypeId,
      machineId: this.selectedMachineId,
      shift: this.selectedShift,
    };

    console.log(washObject);

    this.dataAdd = false;

    this.washService.add(washObject).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.clear();
        this.washStartModal.hide();
        this.dataAdd = true;
      },
      (responseError) => {
        this.dataAdd = true;
        if (responseError.error.ValidationErrors) {
          this.toastrService.error(
            responseError.error.ValidationErrors[0].ErrorMessage
          );
        } else {
          this.toastrService.error(responseError.error.message);
        }
      }
    );
  }

  clear() {
    this.orderId = 0;
    this.selectedWashingTypeId = 0;
    this.selectedWashingType = '';
    this.selectedShift = '';
  }
}
