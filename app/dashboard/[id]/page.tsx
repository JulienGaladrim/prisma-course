"use client";

import { BackLink } from "@/components/BackLink";
import client from "@/lib/axiosClient";
import { flattenObject } from "@/lib/flattenObject";
import { QueryData } from "@/lib/types/queryData";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

const Query = ({ params }: { params: { id: number } }) => {
  const [rows, setRows] = useState<QueryData[]>([]);

  const keys = useMemo(() => {
    if (!rows || rows.length === 0) return [];
    return Object.keys(rows[0]);
  }, [rows]);

  useEffect(() => {
    (async () => {
      const { data } = await client.get("/api/dashboard/" + params.id);
      const flattenedData = data.map((row: QueryData) => flattenObject(row));
      console.log(flattenedData);
      setRows(flattenedData);
    })();
  }, [params.id]);

  return (
    <>
      <h1>Query {params.id}</h1>
      <BackLink link="/dashboard" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {keys.map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {keys.map((key) => (
                  <TableCell key={key}>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Query;
