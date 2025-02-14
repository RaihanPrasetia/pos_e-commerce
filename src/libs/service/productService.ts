import { ProductType } from "@/type/productTypes";
import { initialProducts } from "../fake-db/productDb";

export const getProduct = (): ProductType[] | undefined => {
  return initialProducts;
};
