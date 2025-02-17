import { initialStore } from "../fake-db/storeDb";

export const getStoreByOwnerId = (ownerId: string) => {
  return initialStore.find((store) => store.ownerId === ownerId);
};
