import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  claim: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.claim = localStorage.getItem('claim');
  }
}
