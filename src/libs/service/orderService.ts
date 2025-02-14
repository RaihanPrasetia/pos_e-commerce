import { OrderType } from "@/type/orderTypes";
import { initialOrders } from "../fake-db/orderDb";

export const getOrder = (): OrderType[] | undefined => {
  return initialOrders;
};

export const getOrderByCustomerId = (customerId: string): OrderType[] | [] => {
  return initialOrders.filter((order) => order.customerId === customerId);
};
