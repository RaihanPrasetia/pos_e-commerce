import {
  PromoTransaction,
  TaxTransaction,
  TransactionItem,
  TransactionType,
} from "@/type/transactionType";

export const initialItem: TransactionItem[] = [
  {
    id: "ITMS001",
    name: "Wireless Mouse",
    qty: 2,
    imageUrl: "/assets/img/products/wireless-mouse.png",
    price: 59.98,
    productId: "P001",
    transactionId: "TRS0001",
  },
  {
    id: "ITMS002",
    name: "Bluetooth Headphone",
    qty: 1,
    imageUrl: "/assets/img/products/bluetooth-headphones.png",
    price: 99.99,
    productId: "P002",
    transactionId: "TRS0001",
  },
];

export const initialPromoTrans: PromoTransaction[] = [
  {
    id: "PT001",
    promotionId: "PRM001",
    name: "Last Year",
    transactionId: "TRS0001",
    type: "percentage",
    value: 25,
  },
  {
    id: "PT003",
    promotionId: "PRM001",
    name: "Summer Discount",
    transactionId: "TRS0001",
    type: "percentage",
    value: 15,
  },
];

export const initialTaxTrans: TaxTransaction[] = [
  {
    id: "TT001",
    taxId: "TXS002",
    name: "VAT",
    transactionId: "TRS0001",
    value: 15,
  },
];

export const initialTransaction: TransactionType[] = [
  {
    id: "TRS0001",
    discountValue: 25,
    taxValue: 10,
    qty: 3,
    subTotal: 159.97,
    transactionDt: "02-20-2025",
    transNumber: "TRS-0001-02202025-STR01",
    items: initialItem.filter((i) => i.transactionId === "TRS0001"),
    promotions: initialPromoTrans.filter((p) => p.transactionId === "TRS0001"),
    taxs: initialTaxTrans.filter((t) => t.id === "TRS0001"),
    grandTotal: 159.97,
  },
];
