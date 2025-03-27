import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-washing',
  imports: [],
  templateUrl: './washing.component.html',
  styleUrl: './washing.component.css',
})
export class WashingComponent implements OnInit {
  orderId: number;

  dataLoaded: boolean = false;

  ngOnInit(): void {
    this.orderId = history.state.orderId;
    console.log('Received order ID:', this.orderId);
  }
}
