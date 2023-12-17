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
import { useEffect, useState } from "react";
import client from "@/lib/axiosClient";
import { BackLink } from "@/components/BackLink";
import { OrderList } from "@/lib/types/order";

const limit = 5;

const Orders = () => {
  const [maxPage, setMaxPage] = useState(1);
  const [orders, setOrders] = useState<OrderList>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const { data } = await client.get<OrderList>(
        `/api/order?page=${page}&limit=${limit}`
      );
      setOrders(data);
    })();
  }, [page]);

  useEffect(() => {
    (async () => {
      const { data } = await client.get<number>("/api/order/count");
      setMaxPage(Math.ceil(data / limit));
    })();
  }, []);

  return (
    <>
      <BackLink link="/" />
      <h1>Orders</h1>
      <Button
        variant="contained"
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
      >
        Previous
      </Button>
      <Button
        variant="contained"
        disabled={page === maxPage}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next
      </Button>
      <div>
        Page {page} / {maxPage}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">User name</TableCell>
              <TableCell align="right">Products</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow key={row.id}>
                <TableCell scope="row">{row.id}</TableCell>
                <TableCell align="right">{row.user.name}</TableCell>
                <TableCell align="right">
                  {row.productOrders.map(
                    (productOrder) => productOrder.product.name
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Orders;
