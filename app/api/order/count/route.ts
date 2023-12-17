import prisma from "@/lib/prisma";
import { OrderList } from "@/lib/types/order";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const result: number = await prisma.order.count();
  return NextResponse.json(result, { status: 200 });
};
