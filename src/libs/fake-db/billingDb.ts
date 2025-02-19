import { BillingType } from "@/type/billingTypes";
import { initialCustomers } from "./customerDb";

export const initialBilling: BillingType[] = [
  {
    id: "BLNG001",
    cvc: "pending",
    exp: "10-05-2020",
    isDefault: false,
    number: "7332 9882",
    type: "Mastercard",
    ownerId: "D4e5F6",
    owner: initialCustomers
      .filter((c) => c.id === "D4e5F6")
      .map((c) => ({
        ownerName: c.name,
        ownerEmail: c.email,
        ownerCountry: c.country,
        ownerPhone: c.phone,
      }))[0],
  },
  {
    id: "BLNG002",
    cvc: "approved",
    isDefault: true,
    exp: "10-05-2025",
    number: "1234 5678",
    type: "Visa",
    ownerId: "D4e5F6",
    owner: initialCustomers
      .filter((c) => c.id === "D4e5F6")
      .map((c) => ({
        ownerName: c.name,
        ownerEmail: c.email,
        ownerCountry: c.country,
        ownerPhone: c.phone,
      }))[0],
  },
  {
    id: "BLNG003",
    cvc: "declined",
    isDefault: false,
    exp: "10-08-2030",
    number: "8765 4321",
    type: "Paypal",
    ownerId: "D4e5F6",
    owner: initialCustomers
      .filter((c) => c.id === "D4e5F6")
      .map((c) => ({
        ownerName: c.name,
        ownerEmail: c.email,
        ownerCountry: c.country,
        ownerPhone: c.phone,
      }))[0],
  },
  {
    id: "BLNG003",
    cvc: "approved",
    exp: "10-05-2028",
    isDefault: false,
    number: "8765 4321",
    type: "Paypal",
    ownerId: "D4e5F6",
    owner: initialCustomers
      .filter((c) => c.id === "D4e5F6")
      .map((c) => ({
        ownerName: c.name,
        ownerEmail: c.email,
        ownerCountry: c.country,
        ownerPhone: c.phone,
      }))[0],
  },
];
