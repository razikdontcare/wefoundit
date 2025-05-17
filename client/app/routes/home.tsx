import Navbar from "~/components/navbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Home() {
  return (
    <>
      <Navbar />
    </>
  );
}
