import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-tabs',
  imports: [CommonModule],
  templateUrl: './navigation-tabs.component.html',
  styleUrl: './navigation-tabs.component.css',
})
export class NavigationTabsComponent {
  tabs = [
    { label: 'Home' },
    { label: 'About' },
    { label: 'Services' },
    { label: 'Contact' },
  ];

  selectedIndex = 0;

  selectTab(index: number) {
    this.selectedIndex = index;
  }
}
