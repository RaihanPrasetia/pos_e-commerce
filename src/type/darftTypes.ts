export type DraftType = {
  id: string;
  transNumber: string;
  name: string;
  subTotal: number;
  discountValue: number;
  taxValue: number;
  qty: number;
  items: DraftItem[];
  promotions: PromoDraft[];
  taxs: TaxDraft[];
  draftDt: string;
  isDraft: boolean;
};

export type DraftItem = {
  id: string;
  productId: string;
  draftId: string;
  imageUrl: string;
  name: string;
  price: number;
  qty: number;
};

export type PromoDraft = {
  id: string;
  draftId: string;
  promotionId: string;
  name: string;
  type: string;
  value: number;
};

export type TaxDraft = {
  id: string;
  draftId: string;
  taxId: string;
  name: string;
  value: number;
};
