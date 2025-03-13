import { AuditBaseEntity } from './auditBaseEntity';

export class Order extends AuditBaseEntity {
  customerId: number = 0;
  productId: number = 0;
  quantity: number = 0;
  orderDate: Date = new Date();
  shipDate: Date = new Date();
  shippingAddress: string = '';
  isApproved: boolean | null = null;
}
