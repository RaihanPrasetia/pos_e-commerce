import { AddressType } from "@/type/addressTypes";
import { initialAddress } from "../fake-db/addressDb";

export const getAddressCustomer = (customerId: string): AddressType[] | [] => {
  return initialAddress.filter((a) => a.customerId === customerId);
};
