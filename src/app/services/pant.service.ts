import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { PantFabricModel } from '../models/pantFabricModel';

@Injectable({
  providedIn: 'root',
})
export class PantService {
  apiUrl = 'https://localhost:44372/api/Pants/';

  constructor(private httpClient: HttpClient) {}

  getPants(): Observable<ResponseListDataModel<PantFabricModel>> {
    return this.httpClient.get<ResponseListDataModel<PantFabricModel>>(
      this.apiUrl + 'getallwhitfabric'
    );
  }
}
