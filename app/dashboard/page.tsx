import { BackLink } from "@/components/BackLink";
import Link from "next/link";

const Dashboard = () => {
  const queryList = Array.from({ length: 5 }, (_, index) => index + 1);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <BackLink link="/" />
      <h1>Mes queries</h1>
      {queryList.map((query) => (
        <Link key={query} href={`/dashboard/${query}`}>
          Query {query}
        </Link>
      ))}
    </div>
  );
};

export default Dashboard;
