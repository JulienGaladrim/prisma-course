import prisma from "@/lib/prisma";
import { Query1, QueryData } from "@/lib/types/queryData";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  const data = await queries[params.id - 1]();
  return NextResponse.json(data, { status: 200 });
};

const query1 = async (): Promise<Query1[]> => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });
};

const queries = [query1];
