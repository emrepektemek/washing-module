import { AuditBaseEntity } from './auditBaseEntity';

export class Defect extends AuditBaseEntity {
  defectCategoryId: number = 0;
  defectName: string = '';
  description: string = '';
}
