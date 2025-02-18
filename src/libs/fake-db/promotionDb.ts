import { PromotionType } from "@/type/promotionTypes";

export const initialPromotion: PromotionType[] = [
  {
    id: "PRM001",
    name: "Last Year",
    isActive: true,
    type: "percentage",
    value: 20,
  },
  {
    id: "PRM002",
    name: "New Year Sale",
    isActive: true,
    type: "fixed",
    value: 50,
  },
  {
    id: "PRM003",
    name: "Summer Discount",
    isActive: false,
    type: "percentage",
    value: 15,
  },
  {
    id: "PRM004",
    name: "Winter Sale",
    isActive: true,
    type: "fixed",
    value: 30,
  },
  {
    id: "PRM005",
    name: "Black Friday",
    isActive: true,
    type: "percentage",
    value: 25,
  },
  {
    id: "PRM006",
    name: "Cyber Monday",
    isActive: false,
    type: "fixed",
    value: 40,
  },
  {
    id: "PRM007",
    name: "Spring Sale",
    isActive: true,
    type: "percentage",
    value: 10,
  },
  {
    id: "PRM008",
    name: "Holiday Special",
    isActive: true,
    type: "fixed",
    value: 60,
  },
];
