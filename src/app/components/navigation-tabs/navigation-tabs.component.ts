import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-tabs',
  imports: [CommonModule],
  templateUrl: './navigation-tabs.component.html',
  styleUrl: './navigation-tabs.component.css',
})
export class NavigationTabsComponent {
  constructor(private router: Router) {}

  tabs = [
    { label: 'Quality Control' },
    { label: 'Washing' },
    { label: 'Order' },
    { label: 'Machine' },
    { label: 'Defect' },
  ];

  selectedIndex = 0;

  selectTab(index: number) {
    this.selectedIndex = index;

    if (index === 0) {
      this.router.navigate(['/home/quality-control']);
    }

    if (index === 1) {
      this.router.navigate(['/home/washing']);
    }

    if (index === 2) {
      this.router.navigate(['/home/order']);
    }

    if (index === 3) {
      this.router.navigate(['/home/machine']);
    }
    if (index === 4) {
      this.router.navigate(['/home/defect']);
    }
  }
}
