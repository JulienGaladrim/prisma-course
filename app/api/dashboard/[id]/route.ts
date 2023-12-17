import prisma from "@/lib/prisma";
import {
  Query1,
  Query2,
  Query3,
  Query4,
  Query5,
  QueryData,
} from "@/lib/types/queryData";
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

const query2 = async (): Promise<Query2[]> => {
  return prisma.order.findMany({
    select: {
      id: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
};

const query3 = async (): Promise<Query3[]> => {
  const result = prisma.productOrder.groupBy({
    by: ["productId"],
    _sum: {
      quantity: true,
    },
  });
  return result as Promise<Query3[]>;
};

const query4Raw = async (): Promise<Query4[]> => {
  const result = prisma.$queryRaw`
  SELECT product.id AS id,
  product.name AS name, 
  SUM(quantity) AS quantity 
  FROM product_order
  INNER JOIN product
  ON product.id = product_order.product_id
  GROUP BY product.id, product.name
  ORDER BY quantity DESC`;

  return result as Promise<Query4[]>;
};

const query4JS = async (): Promise<Query4[]> => {
  const result = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      productOrders: {
        select: {
          quantity: true,
        },
      },
    },
  });
  return result
    .map((product) => ({
      id: product.id,
      name: product.name,
      quantity: product.productOrders.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0),
    }))
    .sort((a, b) => b.quantity - a.quantity);
};

const query5Raw = async (): Promise<Query5[]> => {
  const result = prisma.$queryRaw`
  SELECT user.id,
  user.name,
  SUM(product.price * product_order.quantity) AS total
  FROM product_order
  INNER JOIN product
  ON product.id = product_order.product_id
  INNER JOIN \`order\`
  ON \`order\`.id = product_order.order_id
  INNER JOIN user
  ON user.id = \`order\`.user_id
  GROUP BY user.id, user.name
  ORDER BY total DESC`;

  return result as Promise<Query5[]>;
};

const query5JS = async (): Promise<Query5[]> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      orders: {
        select: {
          productOrders: {
            select: {
              quantity: true,
              product: {
                select: {
                  price: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return result
    .map((user) => ({
      id: user.id,
      name: user.name,
      total: user.orders.reduce((acc, cur) => {
        return (
          acc +
          cur.productOrders.reduce((acc, cur) => {
            return acc + cur.quantity * cur.product.price;
          }, 0)
        );
      }, 0),
    }))
    .sort((a, b) => b.total - a.total);
};

const queries = [query1, query2, query3, query4JS, query5JS];
