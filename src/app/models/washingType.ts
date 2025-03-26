import { AuditBaseEntity } from './auditBaseEntity';

export class WashingType extends AuditBaseEntity {
  washingTypeName: string = '';
  washingTime: number = 0;
}
