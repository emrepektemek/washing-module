import { Injectable } from '@angular/core';
import { InventoryReportModel } from '../models/inventoryReportModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseListDataModel } from '../models/responseListDataModel';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  apiUrl = 'https://localhost:44372/api/Inventories/';

  constructor(private httpClient: HttpClient) {}

  getReports(): Observable<ResponseListDataModel<InventoryReportModel>> {
    return this.httpClient.get<ResponseListDataModel<InventoryReportModel>>(
      this.apiUrl + 'getreports'
    );
  }
}
