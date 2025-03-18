import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavigationTabsComponent } from '../navigation-tabs/navigation-tabs.component';

@Component({
  selector: 'app-header',
  imports: [NavigationTabsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toastrService.info('Logged out');
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
