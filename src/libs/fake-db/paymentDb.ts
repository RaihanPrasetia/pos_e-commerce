import { PaymentType } from "@/type/PaymentTypes";

export const initialPayments: PaymentType[] = [
  {
    id: "PYM001",
    isActive: true,
    name: "Cash",
    value: null,
    createDt: "10-05-2020",
    updateDt: null,
  },
  {
    id: "PYM002",
    isActive: true,
    name: "BRI",
    value: "567-6453-0986",
    createDt: "10-05-2020",
    updateDt: null,
  },
];
