import prisma from "@/lib/prisma";
import { ProductDetail } from "@/lib/types/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const result: ProductDetail | null = null; //TODO : fetch product details from db
  return NextResponse.json(result, { status: 200 });
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const data: ProductDetail = await req.json();
  const result = null; //TODO : update product details in db
  return NextResponse.json(result, { status: 200 });
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const result = null; //TODO : delete product from db
  return NextResponse.json(result, { status: 200 });
};
