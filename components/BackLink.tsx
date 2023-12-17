import { Button } from "@mui/material";
import Link from "next/link";

type BackLinkProps = {
  link: string;
};

export const BackLink = ({ link }: BackLinkProps) => (
  <Link href={link}>
    <Button variant="contained">{`<- Back`}</Button>
  </Link>
);
