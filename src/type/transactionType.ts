import { PromotionType } from "./promotionTypes";
import { TaxType } from "./taxTypes";

export type TransactionType = {
  id: string;
  transNumber: string;
  subTotal: number;
  discountValue: number;
  taxValue: number;
  qty: number;
  items: TransactionItem[];
  promotions: PromoTransaction[];
  taxs: TaxTransaction[];
  transactionDt: string;
};

export type TransactionItem = {
  id: string;
  productId: string;
  transactionId: string;
  imageUrl: string;
  name: string;
  price: number;
  qty: number;
};

export type PromoTransaction = {
  id: string;
  transactionId: string;
  promotionId: string;
  name: string;
  type: string;
  value: number;
};

export type TaxTransaction = {
  id: string;
  transactionId: string;
  taxId: string;
  name: string;
  value: number;
};
