import { OrderDefect } from './orderDefect';

export class OrderDefectWithDefectAndOrderModel extends OrderDefect {
  defectName: string = '';
  orderNumber: string = '';
  pantQuantity: number = 0;
  orderCreatedDate: string = '';
}
