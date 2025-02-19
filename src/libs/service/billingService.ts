import { initialBilling } from "../fake-db/billingDb";

export const getBillings = (ownerId: string) => {
  return initialBilling
    .filter((b) => b.ownerId === ownerId)
    .sort((a, b) => (b.isDefault ? 1 : -1));
};
