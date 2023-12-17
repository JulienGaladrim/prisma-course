"use client";

import client from "@/lib/axiosClient";
import { dateFormat } from "@/lib/date";
import { ProductDetail } from "@/lib/types/product";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ProductCategory, ProductType } from "@prisma/client";
import { format, set } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { BackLink } from "./BackLink";

type ProductDetailsProps = {
  id?: string;
};

const emptyProduct: ProductDetail = {
  id: "",
  name: "",
  price: 0,
  type: ProductType.BOOK,
  createdAt: null,
  updatedAt: null,
  productCategory: {
    id: "",
    name: "",
  },
};

const ProductDetails = ({ id }: ProductDetailsProps) => {
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetail>(emptyProduct);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    (async () => {
      if (refetch && id !== undefined) {
        const { data: fetchedProduct } = await client.get<ProductDetail | null>(
          "/api/product/" + id
        );
        setRefetch(false);
        if (fetchedProduct === null) return;
        setProduct(fetchedProduct);
      }
    })();
  }, [id, refetch]);

  useEffect(() => {
    (async () => {
      const { data: fetchedCategories } = await client.get<ProductCategory[]>(
        "/api/product-category/"
      );
      setCategories(fetchedCategories);
    })();
  }, []);

  const onChangeHandler =
    (key: keyof ProductDetail) =>
    (
      event:
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent
    ) => {
      if (product) {
        switch (key) {
          case "productCategory":
            const newCategory = categories.find(
              (c) => c.name === event.target.value
            );
            if (newCategory === undefined) return;
            setProduct({ ...product, productCategory: newCategory });
            break;
          case "price":
            setProduct({ ...product, [key]: Number(event.target.value) });
            break;
          default:
            setProduct({ ...product, [key]: event.target.value });
            break;
        }
      }
    };

  const saveProduct = async () => {
    if (product) {
      if (product.id === "") {
        const { data }: { data: ProductDetail } = await client.post(
          "/api/product",
          product
        );
        router.push("/product/" + data.id);
      } else {
        await client.put("/api/product/" + product.id, product);
        setRefetch(true);
      }
    }
  };

  return (
    <>
      <BackLink link="/product" />
      <Box
        component="form"
        sx={{
          flexDirection: "column",
          display: "flex",
          width: "50%",
          margin: "auto",
          gap: "1rem",
          padding: "2rem",
          backgroundColor: "#fff",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="id" label="Id" value={product?.id} disabled />
        <TextField
          id="name"
          label="Name"
          onChange={onChangeHandler("name")}
          value={product?.name ?? ""}
        />
        <TextField
          id="price"
          label="Price"
          value={product?.price ?? ""}
          onChange={onChangeHandler("price")}
        />
        <Select
          value={product?.type ?? ProductType.BOOK}
          onChange={onChangeHandler("type")}
        >
          {Object.values(ProductType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={product?.productCategory.name ?? ""}
          onChange={onChangeHandler("productCategory")}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          id="createdAt"
          label="Created At"
          value={product.createdAt ? format(product.createdAt, dateFormat) : ""}
          disabled
        />
        <TextField
          id="updatedAt"
          label="Updated At"
          value={product.updatedAt ? format(product.updatedAt, dateFormat) : ""}
          disabled
        />
        <Button variant="contained" onClick={saveProduct}>
          Save
        </Button>
      </Box>
    </>
  );
};

export default ProductDetails;
