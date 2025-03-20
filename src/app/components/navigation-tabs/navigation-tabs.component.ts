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
    { label: 'Summary' },
    { label: 'Washing' },
    { label: 'Order' },
    { label: 'Machine' },
    { label: 'Defect' },
  ];

  selectedIndex = 0;

  selectTab(index: number) {
    this.selectedIndex = index;
    console.log(this.selectedIndex);
  }
}
