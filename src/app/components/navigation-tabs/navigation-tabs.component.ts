import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-tabs',
  imports: [CommonModule],
  templateUrl: './navigation-tabs.component.html',
  styleUrl: './navigation-tabs.component.css',
})
export class NavigationTabsComponent implements OnInit {
  tabs = [
    { label: 'Quality Control', path: '/home/quality-control' },
    { label: 'Washing', path: '/home/washing' },
    { label: 'Order', path: '/home/order' },
    { label: 'Machine', path: '/home/machine' },
    { label: 'Defect', path: '/home/defect' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const savedTabIndex = localStorage.getItem('selectedTabIndex');
    const currentPath = this.router.url;

    if (savedTabIndex) {
      this.selectedIndex = +savedTabIndex;
      this.router.navigate([this.tabs[this.selectedIndex].path]);
    } else {
      const matchedTabIndex = this.tabs.findIndex(
        (tab) => tab.path === currentPath
      );
      if (matchedTabIndex !== -1) {
        this.selectedIndex = matchedTabIndex;
      } else if (currentPath === '/home') {
        this.selectedIndex = 0;
        this.router.navigate(['/home/quality-control']);
      }
    }
  }

  selectedIndex: number = 0;

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
