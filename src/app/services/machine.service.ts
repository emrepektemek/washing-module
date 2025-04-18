import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MachineAddModel } from '../models/machineAddModel';
import { Machine } from '../models/machine';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ResponseListDataModel } from '../models/responseListDataModel';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  apiUrl = 'https://localhost:44372/api/Machines/';

  constructor(private httpClient: HttpClient) {}

  add(machine: MachineAddModel) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', machine);
  }

  getMachines(): Observable<ResponseListDataModel<Machine>> {
    return this.httpClient.get<ResponseListDataModel<Machine>>(
      this.apiUrl + 'getall'
    );
  }
}
