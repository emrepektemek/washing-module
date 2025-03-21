import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Machine } from '../models/machine';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  apiUrl = 'https://localhost:44372/api/Machine/';

  constructor(private httpClient: HttpClient) {}

  add(machine: Machine) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', machine);
  }
}
