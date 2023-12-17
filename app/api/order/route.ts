import prisma from "@/lib/prisma";
import { OrderList } from "@/lib/types/order";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");
  const result: OrderList = await prisma.order.findMany({
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      productOrders: {
        select: {
          id: true,
          product: {
            select: {
              id: true,
              name: true,
            },
          },
          quantity: true,
        },
      },
    },
    skip: page ? parseInt(page) : undefined,
    take: limit ? parseInt(limit) : undefined,
  });
  return NextResponse.json(result, { status: 200 });
};
