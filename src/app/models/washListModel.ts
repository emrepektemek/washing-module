import { Wash } from './wash';

export class WashList extends Wash {
  orderNumber: string = '';
  pantId: number = 0;
  pantQuantity: number = 0;
  modelName: string = '';
  washingTypeName: string = '';
  washingTime: number = 0;
  machineId: number = 0;
  machineName: string = '';
  machineType: string = '';
}
