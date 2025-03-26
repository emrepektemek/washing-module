import { AuditBaseEntity } from './auditBaseEntity';

export class Order extends AuditBaseEntity {
  orderNumber: string = '';
  pantId: number = 0;
  pantQuantity: number = 0;
}
