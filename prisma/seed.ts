import { PrismaClient, ProductCategory, ProductType } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORY_NUMBER = 5;
const PRODUCT_NUMBER = 100;
const USER_NUMBER = 20;
const ORDER_NUMBER = 500;
const START_DATE = new Date(2018, 0, 1);
const END_DATE = new Date();

const randomDate = () => {
  return new Date(
    START_DATE.getTime() +
      Math.random() * (END_DATE.getTime() - START_DATE.getTime())
  );
};
const emptyTables = async () => {
  // await prisma.productOrder.deleteMany();
  // await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productCategory.deleteMany();
};

const createCategories = async () => {
  const newCategories = [];
  for (let i = 0; i < CATEGORY_NUMBER; i++) {
    newCategories.push({
      name: `Category ${i}`,
    });
  }
  await prisma.productCategory.createMany({
    data: newCategories,
  });
  return prisma.productCategory.findMany();
};

const createProducts = async (categories: ProductCategory[]) => {
  const newProducts = [];
  const productTypes = Object.values(ProductType);
  for (let i = 0; i < PRODUCT_NUMBER; i++) {
    newProducts.push({
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100),
      type: productTypes[Math.floor(Math.random() * 3)],
      productCategoryId:
        categories[Math.floor(Math.random() * categories.length)].id,
    });
  }
  await prisma.product.createMany({
    data: newProducts,
  });
  return prisma.product.findMany();
};

const createUsers = async () => {
  const users = [];
  for (let i = 0; i < USER_NUMBER; i++) {
    users.push({
      name: `User ${i}`,
      email: `test_${i}@seed.mail`,
      password: `test_${i}`,
    });
  }
  await prisma.user.createMany({
    data: users,
  });
  return prisma.user.findMany();
};

// const createOrders = async (users: User[]) => {
//   const orders = [];
//   for (let i = 0; i < ORDER_NUMBER; i++) {
//     orders.push({
//       userId: users[Math.floor(Math.random() * users.length)].id,
//       createdAt: randomDate(),
//     });
//   }
//   await prisma.order.createMany({
//     data: orders,
//   });
//   return prisma.order.findMany();
// };

// const createProductOrders = async (products: Product[], orders: Order[]) => {
//   const productOrders = [];
//   for (let i = 0; i < ORDER_NUMBER; i++) {
//     const order = orders[i];
//     const orderProducts = products.filter(() => Math.random() > 0.5);
//     for (const product of orderProducts) {
//       productOrders.push({
//         orderId: order.id,
//         productId: product.id,
//         quantity: Math.floor(Math.random() * 10),
//         createdAt: order.createdAt,
//       });
//     }
//   }
//   await prisma.productOrder.createMany({
//     data: productOrders,
//   });
//   return prisma.productOrder.findMany();
// };

async function main() {
  await emptyTables();
  const categories = await createCategories();
  const products = await createProducts(categories);
  const users = await createUsers();
  // const orders = await createOrders(users);
  // await createProductOrders(products, orders);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
