export type CvcType = "approved" | "declined" | "pending";

export type BillingType = {
  id: string;
  number: string;
  isDefault: boolean;
  exp: string;
  type: string;
  cvc: CvcType;
  ownerId: string;
  owner:
    | {
        ownerName: string;
        ownerCountry: string;
        ownerEmail: string;
        ownerPhone: string;
      }
    | undefined;
};
