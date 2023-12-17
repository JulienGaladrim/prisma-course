import prisma from "@/lib/prisma";
import { ProductDetail } from "@/lib/types/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const result: ProductDetail | null = await prisma.product.findUnique({
    where: { id: id },
    include: {
      productCategory: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return NextResponse.json(result, { status: 200 });
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const data: ProductDetail = await req.json();
  const result = await prisma.product.update({
    where: { id: id },
    data: {
      name: data.name,
      price: data.price,
      type: data.type,
      productCategoryId: data.productCategory.id,
    },
  });
  return NextResponse.json(result, { status: 200 });
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const result = await prisma.product.update({
    where: { id: id },
    data: {
      deletedAt: new Date(),
    },
  });
  return NextResponse.json(result, { status: 200 });
};
