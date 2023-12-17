"use client";

import ProductDetails from "@/components/ProductDetails";

const UpdateProduct = ({ params }: { params: { id: string } }) => {
  return <ProductDetails id={params.id} />;
};

export default UpdateProduct;
