import { ProductType } from "@prisma/client";

export type ProductList = {
  id: string;
  name: string;
  price: number;
  type: ProductType;
}[];

export type ProductDetail = {
  id: string;
  name: string;
  price: number;
  type: ProductType;
  createdAt: Date | null;
  updatedAt: Date | null;
  productCategory: {
    id: string;
    name: string;
  };
};
