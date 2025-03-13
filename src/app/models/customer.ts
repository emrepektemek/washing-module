import { AuditBaseEntity } from './auditBaseEntity';

export class Customer extends AuditBaseEntity {
  userId: number = 0;
  customerName: string = '';
  address: string = '';
  phoneNumber: string = '';
  email: string = '';
}
