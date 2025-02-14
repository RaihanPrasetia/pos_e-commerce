import { CategoryType } from "@/type/categoryTypes";

export const initialCategories: CategoryType[] = [
  {
    id: "C001",
    description: "Desc Category 1",
    name: "Elektronik",
    parentId: null,
    isActive: true,
  },
  {
    id: "C002",
    description: "Desc Category 2",
    name: "Fashion",
    parentId: null,
    isActive: true,
  },
  {
    id: "C003",
    description: "Desc Category 3",
    name: "Handphone",
    parentId: "C001",
    isActive: true,
  },
  {
    id: "C004",
    description: "Desc Category 4",
    name: "Books",
    parentId: null,
    isActive: true,
  },
  {
    id: "C005",
    description: "Desc Category 5",
    name: "Sports",
    parentId: null,
    isActive: true,
  },
  {
    id: "C006",
    description: "Desc Category 6",
    name: "Adventure",
    parentId: "C004",
    isActive: true,
  },
  {
    id: "C007",
    description: "Desc Category 7",
    name: "Beauty",
    parentId: null,
    isActive: true,
  },
  {
    id: "C008",
    description: "Desc Category 8",
    name: "Automotive",
    parentId: null,
    isActive: true,
  },
];
