import { AuditBaseEntity } from './auditBaseEntity';

export class Product extends AuditBaseEntity {
  categoryId: number = 0;
  productName: string = '';
  size: number = 0;
  unitPrice: number = 0.0;
  description: string = '';
}
