import prisma from "@/lib/prisma";
import { ProductDetail, ProductList } from "@/lib/types/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const result: ProductList = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      type: true,
    },
  });
  return NextResponse.json(result, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const data: ProductDetail = await req.json();
  const result = null; //TODO : create product in db
  return NextResponse.json(result, { status: 200 });
};
