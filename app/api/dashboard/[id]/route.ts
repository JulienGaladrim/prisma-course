import prisma from "@/lib/prisma";
import { Query1, Query2, Query3, Query4, Query5 } from "@/lib/types/queryData";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  const data = await queries[params.id - 1]();
  return NextResponse.json(data, { status: 200 });
};

// Users with the number of orders
const query1 = async (): Promise<Query1[]> => {
  return [];
};

// Last 5 orders created with the user name
const query2 = async (): Promise<Query2[]> => {
  return [];
};

//Number of product sold per product
const query3 = async (): Promise<Query3[]> => {
  return [];
  //return result as Promise<Query3[]>;
};

// Number of product sold per product with the product name
const query4 = async (): Promise<Query4[]> => {
  return [];
  // return result as Promise<Query4[]>;
};

// Total amount spent per user
const query5 = async (): Promise<Query5[]> => {
  return [];
  //return result as Promise<Query5[]>;
};

// Total amount sold per product category with the product category name

// Total amount sold per product category per month

const queries = [query1, query2, query3, query4, query5];
