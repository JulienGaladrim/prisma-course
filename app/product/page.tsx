"use client";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import { ProductList } from "@/lib/types/product";
import { useEffect, useState } from "react";
import client from "@/lib/axiosClient";
import { BackLink } from "@/components/BackLink";

const Product = () => {
  const [products, setProducts] = useState<ProductList>([]);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    (async () => {
      if (!refetch) return;
      const { data } = await client.get<ProductList>("/api/product");
      setProducts(data);
      setRefetch(false);
    })();
  }, [refetch]);

  const deleteProduct = (id: string) => async () => {
    await client.delete("/api/product/" + id);
    setRefetch(true);
  };

  return (
    <>
      <BackLink link="/" />
      <h1>Products</h1>
      <Link href="/product/add">
        <Button variant="contained">+ Add product</Button>
      </Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Details</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.id}>
                <TableCell scope="row">{row.id}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">
                  <Link href={`/product/${row.id}`}>See details</Link>
                </TableCell>
                <TableCell align="right">
                  <Button onClick={deleteProduct(row.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Product;
