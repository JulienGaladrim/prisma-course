This is a small lightweigh project used as support to teach the prisma basics.

## Getting Started

Install the dependencies with

`npm install`

To setup the database, you can use docker, or a local/remote mysql server.

To install docker follow instructions on https://docs.docker.com/engine/install/ .

Run the following command to create the database :

`npm run db:setup`

Don't forget to delete the container when you're done with it :

`npm run db:delete`

Finally start the project with

`npm run dev`

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
