import { PaymentType } from "./PaymentTypes";
import { ProductType } from "./productTypes";

export type OrderType = {
  id: string;
  orderNumber: string;
  customerId: string;
  orderDate: string;
  status: string;
  paymentStatus: string;
  total: number;
  qty: number;
  paymentId: string;
  payment: PaymentType | undefined;
  items: OrderItemType[];
};

export type OrderItemType = {
  id: string;
  quantity: number;
  price: number;
  productId: string;
  product: ProductType | undefined;
};
