import { PromoDraft, TaxDraft, DraftItem, DraftType } from "@/type/darftTypes";

export const initialItem: DraftItem[] = [
  {
    id: "ITMS001",
    name: "Wireless Mouse",
    qty: 2,
    imageUrl: "/assets/img/products/wireless-mouse.png",
    price: 59.98,
    productId: "P001",
    draftId: "TRS0001",
  },
  {
    id: "ITMS002",
    name: "Bluetooth Headphone",
    qty: 1,
    imageUrl: "/assets/img/products/bluetooth-headphones.png",
    price: 99.99,
    productId: "P002",
    draftId: "TRS0001",
  },
];

export const initialPromoTrans: PromoDraft[] = [
  {
    id: "PT001",
    promotionId: "PRM001",
    name: "Last Year",
    draftId: "TRS0001",
    type: "percentage",
    value: 25,
  },
  {
    id: "PT003",
    promotionId: "PRM003",
    name: "Summer Discount",
    draftId: "TRS0001",
    type: "percentage",
    value: 15,
  },
];

export const initialTaxTrans: TaxDraft[] = [
  {
    id: "TT001",
    taxId: "TXS002",
    name: "VAT",
    draftId: "TRS0001",
    value: 15,
  },
];

export const initialDraft: DraftType[] = [
  {
    id: "TRS0001",
    name: "Jhon doe",
    discountValue: 25,
    taxValue: 10,
    qty: 3,
    subTotal: 159.97,
    draftDt: "02-20-2025",
    transNumber: "TRS-0001-02202025-STR01",
    items: initialItem.filter((i) => i.draftId === "TRS0001"),
    promotions: initialPromoTrans.filter((p) => p.draftId === "TRS0001"),
    taxs: initialTaxTrans.filter((t) => t.draftId === "TRS0001"),
    isDraft: true,
  },
  {
    id: "TRS0002",
    name: "Alex",
    discountValue: 25,
    taxValue: 10,
    qty: 3,
    subTotal: 159.97,
    draftDt: "02-20-2025",
    transNumber: "TRS-0001-02202025-STR01",
    items: initialItem.filter((i) => i.draftId === "TRS0001"),
    promotions: initialPromoTrans.filter((p) => p.draftId === "TRS0001"),
    taxs: initialTaxTrans.filter((t) => t.draftId === "TRS0001"),
    isDraft: false,
  },
];
