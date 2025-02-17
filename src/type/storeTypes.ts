import { userType } from "./userTypes";

export type storeType = {
  id: string;
  storeName: string;
  phoneNumber: string;
  imageUrl: string | null;
  storeEmail: string;
  storeAddress: string;
  ownerId: string;
  owner:
    | Pick<userType, "name" | "email" | "address" | "phoneNumber">
    | undefined;
};
