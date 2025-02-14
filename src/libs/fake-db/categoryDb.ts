import { CategoryType } from "@type/categoryTypes";

export let initialCategories: CategoryType[] = [
  {
    "id": "C001",
    "description": "Desc Category 1",
    "name": "Elektronik",
    "parentId": null,
    "isActive": true
  },
  {
    "id": "C002",
    "description": "Desc Category 2",
    "name": "Fashion",
    "parentId": null,
    "isActive": false
  },
  {
    "id": "C003",
    "description": "Desc Category 3",
    "name": "Handphone",
    "parentId": "C001",
    "isActive": true
  },
  {
    "id": "C004",
    "description": "Desc Category 4",
    "name": "Books",
    "parentId": null,
    "isActive": false
  },
  {
    "id": "C005",
    "description": "Desc Category 5",
    "name": "Sports",
    "parentId": null,
    "isActive": true
  },
  {
    "id": "C006",
    "description": "Desc Category 6",
    "name": "Adventure",
    "parentId": null,
    "isActive": false
  },
  {
    "id": "C007",
    "description": "Desc Category 7",
    "name": "Beauty",
    "parentId": null,
    "isActive": true
  },
  {
    "id": "C008",
    "description": "Desc Category 8",
    "name": "Automotive",
    "parentId": null,
    "isActive": true
  },
  {
    "id": "79585b98-92f4-4a43-aa1f-228ecd5a26cf",
    "name": "Sepatu",
    "description": "Desc Sepatu",
    "parentId": "C005",
    "isActive": false
  },
  {
    "id": "2ea226b5-9070-4490-9caf-5c488b909488",
    "name": "Lipstick",
    "description": "Desc Lipstick",
    "isActive": false,
    "parentId": null
  },
  {
    "id": "8d905877-7189-4713-a479-8b1bfc466d00",
    "name": "Laptop",
    "description": "Samsung",
    "isActive": true,
    "parentId": "C001"
  },
  {
    "id": "83e2263e-9710-4794-bee8-e3ddd05f320d",
    "name": "Hoodie",
    "description": "Desc Hoodie",
    "isActive": false,
    "parentId": "C002"
  },
  {
    "id": "86208ead-4ae7-4a17-8774-301e2d9a16eb",
    "name": "Accessories",
    "description": "Desc Accessories",
    "isActive": false,
    "parentId": null
  }
];