import prisma from "@/lib/prisma";
import { ProductDetail, ProductList } from "@/lib/types/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  if (req.method === "GET") {
    const result: ProductList = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        type: true,
      },
      where: {
        deletedAt: null,
      },
    });
    return NextResponse.json(result, { status: 200 });
  }
};

export const POST = async (req: NextRequest) => {
  const data: ProductDetail = await req.json();
  const result = await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      type: data.type,
      productCategoryId: data.productCategory.id,
    },
  });
  return NextResponse.json(result, { status: 200 });
};
