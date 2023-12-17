import prisma from "@/lib/prisma";
import { ProductCategory } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  if (req.method === "GET") {
    const result: ProductCategory[] = await prisma.productCategory.findMany();
    return NextResponse.json(result, { status: 200 });
  }
};
