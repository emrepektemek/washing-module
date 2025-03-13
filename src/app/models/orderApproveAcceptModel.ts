export class OrderApproveAcceptModel {
  id: number = 0;

  productId: number = 0;

  warehouseId: number = 0;

  quantity: number = 0;

  isApproved: boolean | null = null;

  lastUpdatedUserId: string | null = null;
}
