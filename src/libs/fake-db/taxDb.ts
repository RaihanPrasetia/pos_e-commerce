import { TaxType } from "@/type/taxTypes";

export const initialTax: TaxType[] = [
  {
    id: "TXS001",
    name: "PPN",
    isActive: true,
    value: 20,
  },
  {
    id: "TXS002",
    name: "VAT",
    isActive: true,
    value: 15,
  },
  {
    id: "TXS003",
    name: "Service Tax",
    isActive: false,
    value: 10,
  },
  {
    id: "TXS004",
    name: "Sales Tax",
    isActive: true,
    value: 8,
  },
  {
    id: "TXS005",
    name: "Excise Duty",
    isActive: true,
    value: 12,
  },
  {
    id: "TXS006",
    name: "Custom Duty",
    isActive: false,
    value: 5,
  },
  {
    id: "TXS007",
    name: "Luxury Tax",
    isActive: true,
    value: 25,
  },
  {
    id: "TXS008",
    name: "Entertainment Tax",
    isActive: true,
    value: 18,
  },
];
