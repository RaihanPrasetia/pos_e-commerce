import { storeType } from "@/type/storeTypes";
import { initialUser } from "./userDb";

export const initialStore: storeType[] = [
  {
    id: "STR001",
    storeName: "Store Example",
    phoneNumber: "134-67462",
    storeAddress: "456 Main Rm, Real Madrid, NY 10070",
    storeEmail: "store@mail.com",
    ownerId: "f1359428-dac3-487b-a8d3-4711bec7f323",
    imageUrl: "/assets/img/logos/store-logo.png",
    owner: initialUser.find(
      (user) => user.id === "f1359428-dac3-487b-a8d3-4711bec7f323"
    )
      ? {
          name: initialUser.find(
            (user) => user.id === "f1359428-dac3-487b-a8d3-4711bec7f323"
          )!.name,
          email: initialUser.find(
            (user) => user.id === "f1359428-dac3-487b-a8d3-4711bec7f323"
          )!.email,
          address: initialUser.find(
            (user) => user.id === "f1359428-dac3-487b-a8d3-4711bec7f323"
          )!.address,
          phoneNumber: initialUser.find(
            (user) => user.id === "f1359428-dac3-487b-a8d3-4711bec7f323"
          )!.phoneNumber,
        }
      : undefined,
  },
  {
    id: "STR002",
    storeName: "Store Example",
    phoneNumber: "134-67462",
    storeAddress: "456 Main Rm, Real Madrid, NY 10070",
    storeEmail: "store@mail.com",
    ownerId: "c25c46f1-c211-430a-8380-9eccd803696a",
    imageUrl: "/assets/img/logos/store-logo.png",
    owner: initialUser.find(
      (user) => user.id === "c25c46f1-c211-430a-8380-9eccd803696a"
    )
      ? {
          name: initialUser.find(
            (user) => user.id === "c25c46f1-c211-430a-8380-9eccd803696a"
          )!.name,
          email: initialUser.find(
            (user) => user.id === "c25c46f1-c211-430a-8380-9eccd803696a"
          )!.email,
          address: initialUser.find(
            (user) => user.id === "c25c46f1-c211-430a-8380-9eccd803696a"
          )!.address,
          phoneNumber: initialUser.find(
            (user) => user.id === "c25c46f1-c211-430a-8380-9eccd803696a"
          )!.phoneNumber,
        }
      : undefined,
  },
];
