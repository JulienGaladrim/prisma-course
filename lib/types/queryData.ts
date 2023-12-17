export type QueryData = {
  id: string;
  name: string;
  [key: string]: any;
};

export interface Query1 extends QueryData {
  _count: {
    orders: number;
  };
}
