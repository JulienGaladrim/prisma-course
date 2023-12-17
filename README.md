This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Todo on this course (step by step) :

Create the model Order and ProductOrder, then generate the tables and seed them (uncomment the code in prisma/seed.ts).

Add the CRUD for the Product table :

- in app/api/product/route.ts : add the create logic
- in app/api/product/[id]/route.ts : add the select, update and delete logic

Make the order routes operationnal :

- in app/api/order/route.ts : uncomment the code and update the query to take pagination in account
- in app/api/order/count/route.ts : uncomment the code

Make the queries for the dashboard. In /app/api/dashboard/[id]/route.ts, make the prisma query for each of the 5 calls.

For every query, the types are already defined
