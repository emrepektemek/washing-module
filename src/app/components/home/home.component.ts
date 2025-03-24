import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserState } from '../../store/user.state';
import { CommonModule } from '@angular/common';
import { concatMap, forkJoin } from 'rxjs';

import { PantService } from '../../services/pant.service';
import { PantState } from '../../store/pant.state';

import { WashingTypeService } from '../../services/washing-type.service';
import { WashingTypeState } from '../../store/washing-type.state';

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
    private userService: UserService,
    private userSate: UserState,
    private pantService: PantService,
    private pantState: PantState,
    private washingTypeService: WashingTypeService,
    private washingTypeState: WashingTypeState
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    this.userService
      .getUsers()
      .pipe(
        concatMap((users) => {
          this.userSate.setUsers(users.data);
          return this.pantService.getPants();
        }),
        concatMap((pants) => {
          this.pantState.setPants(pants.data);
          return this.washingTypeService.getWashingTypes();
        })
      )
      .subscribe((washingTypes) => {
        this.washingTypeState.setWashingType(washingTypes.data);
        this.dataLoaded = true;
      });
  }

  logout() {
    this.authService.logout();
    this.userSate.clearUsers();
    this.pantState.clearPants();
    this.washingTypeState.clearWashingType();
    this.router.navigate(['/login']);
    this.toastrService.info('Logged out');
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
