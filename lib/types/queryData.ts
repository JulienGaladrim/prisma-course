export type QueryData = {
  [key: string]: any;
};

export interface Query1 extends QueryData {
  id: string;
  name: string;
  _count: {
    orders: number;
  };
}

export interface Query2 extends QueryData {
  id: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
  };
}

export interface Query3 extends QueryData {
  productId: string;
  _sum: {
    quantity: number | null;
  };
}

export interface Query4 extends QueryData {
  id: string;
  name: string;
  quantity: number | null;
}

export interface Query5 extends QueryData {
  id: string;
  name: string;
  total: number;
}
