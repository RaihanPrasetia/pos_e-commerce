import { CustomerType } from "@/type/cutomersType";
import { initialCustomers } from "../fake-db/customerDb";

export const getCustomerById = (id: string): CustomerType | undefined => {
  return initialCustomers.find((customer) => customer.id === id);
};

export const getCustomer = (): CustomerType[] | undefined => {
  return initialCustomers;
};
