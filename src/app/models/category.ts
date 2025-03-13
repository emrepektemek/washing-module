import { AuditBaseEntity } from './auditBaseEntity';

export class Category extends AuditBaseEntity {
  categoryName: string = '';
  description: string = '';
}
