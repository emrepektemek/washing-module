import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { concatMap, forkJoin } from 'rxjs';

import { PantService } from '../../services/pant.service';
import { PantState } from '../../store/pant.state';

import { WashingTypeService } from '../../services/washing-type.service';
import { WashingTypeState } from '../../store/washing-type.state';
import { OrderService } from '../../services/order.service';
import { OrderState } from '../../store/order.state';
import { WashService } from '../../services/wash.service';
import { WashState } from '../../store/wash.state';
import { DefectService } from '../../services/defect.service';
import { DefectState } from '../../store/defect.state';
import { OrderDefectService } from '../../services/order-defect.service';
import { OrderDefectState } from '../../store/order-defect.state';
import { MachineService } from '../../services/machine.service';
import { MachineState } from '../../store/machine.state';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, RouterModule, CommonModule],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  dataLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private pantService: PantService,
    private pantState: PantState,
    private washingTypeService: WashingTypeService,
    private washingTypeState: WashingTypeState,
    private orderService: OrderService,
    private orderState: OrderState,
    private washService: WashService,
    private washState: WashState,
    private defectService: DefectService,
    private defectState: DefectState,
    private orderDefectService: OrderDefectService,
    private orderDefectState: OrderDefectState,
    private machineService: MachineService,
    private machineState: MachineState
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    this.pantService
      .getPants()
      .pipe(
        concatMap((pants) => {
          this.pantState.setPants(pants.data);
          return this.washingTypeService.getWashingTypes();
        }),
        concatMap((washingTypes) => {
          this.washingTypeState.setWashingType(washingTypes.data);
          return this.orderService.getOrdersWithPants();
        }),
        concatMap((orders) => {
          this.orderState.setOrders(orders.data);
          return this.washService.getAllForWashing();
        }),
        concatMap((washes) => {
          this.washState.setWashes(washes.data);
          return this.defectService.getDefects();
        }),
        concatMap((defects) => {
          this.defectState.setDefects(defects.data);
          return this.orderDefectService.getOrderDefects();
        }),
        concatMap((orderDefects) => {
          this.orderDefectState.setOrderDefect(orderDefects.data);
          return this.machineService.getMachines();
        })
      )
      .subscribe((machines) => {
        this.machineState.setMachines(machines.data);
        this.dataLoaded = true;
      });
  }

  logout() {
    this.authService.logout();
    this.pantState.clearPants();
    this.washingTypeState.clearWashingType();
    this.orderState.clearOrders();
    this.washState.clearWashes();
    this.defectState.clearDefects();
    this.orderDefectState.clearOrderDefect();
    this.machineState.clearMachines();
    this.router.navigate(['/login']);
    this.toastrService.info('Logged out');
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
