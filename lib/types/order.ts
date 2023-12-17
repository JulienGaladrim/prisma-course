export type OrderList = {
  id: string;
  user: {
    id: string;
    name: string;
  };
  productOrders: {
    id: string;
    product: {
      id: string;
      name: string;
    };
    quantity: number;
  }[];
}[];
