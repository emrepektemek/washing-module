export abstract class AuditBaseEntity {
  id: number = 0;
  createdUserId: number = 0;
  createdDate: string = '';
  lastUpdatedUserId: number;
  lastUpdatedDate: string = '';
  status: boolean = true;
  isDeleted: boolean = false;
}
