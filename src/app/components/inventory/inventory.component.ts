import { Component, OnInit } from '@angular/core';
import { InventoryReportModel } from '../../models/inventoryReportModel';
import { CommonModule } from '@angular/common';

import { InventoryReportState } from '../../store/inventory-report.state';
import { take } from 'rxjs';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent implements OnInit {
  inventoryReports: InventoryReportModel[] = [];
  searchText: string = '';
  dataLoaded: boolean = false;

  constructor(private inventoryReportState: InventoryReportState) {}

  ngOnInit(): void {
    this.inventoryReportState.inventoryReports$
      .pipe(take(1))
      .subscribe((reports) => {
        this.inventoryReports = reports;
        this.dataLoaded = true;
      });
  }

  get filteredInventoryReports(): InventoryReportModel[] {
    if (!this.searchText) {
      return this.inventoryReports;
    }

    const lowerCaseSearch = this.searchText.toLowerCase();

    return this.inventoryReports.filter(
      (inventoryReport) =>
        inventoryReport.warehouseName.toLowerCase().includes(lowerCaseSearch) ||
        inventoryReport.warehouseLocation
          .toLowerCase()
          .includes(lowerCaseSearch) ||
        inventoryReport.productName.toLowerCase().includes(lowerCaseSearch) ||
        inventoryReport.stockQuantity.toString().includes(lowerCaseSearch)
    );
  }
}
