import { CategoryType } from "./categoryTypes";

export type ProductType = {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  code: string;
  isActive: boolean;
  imageUrl: string;
  category: CategoryType;
};
