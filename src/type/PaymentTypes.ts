export type PaymentType = {
  id: string;
  name: string;
  value?: string | null;
  isActive: boolean;
  createDt?: string;
  updateDt?: string | null;
};
