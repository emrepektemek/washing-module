import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserState } from '../../store/user.state';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

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
    private userSate: UserState
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    forkJoin({
      users: this.userService.getUsers(),
    }).subscribe(({ users }) => {
      this.userSate.setUsers(users.data);
      this.dataLoaded = true;
    });
  }

  logout() {
    this.authService.logout();
    this.userSate.clearUsers();
    this.router.navigate(['/login']);
    this.toastrService.info('Logged out');
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
