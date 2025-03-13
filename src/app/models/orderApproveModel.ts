import { Order } from './order';

export class OrderApproveModel extends Order {
  customerName: string = '';
  customerEmail: string = '';
  customerAddress: string = '';
  productName: string = '';
  unitPrice: number = 0.0;
}
