import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Ma super demo Prisma</h1>
      <Link href="/product">Products</Link>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
