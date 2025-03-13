export class OrderReportModel {
  orderId: number = 0;

  customerName: string = '';

  productName: string = '';

  customerAddress: string = '';

  customerPhoneNumber: string = '';

  quantity: number = 0;

  customerEmail: string = '';

  orderDate: Date = new Date();

  shipDate: Date = new Date();

  orderStatus: boolean = true;

  isApproved: boolean = true;
}
