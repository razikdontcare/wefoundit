import type { Route } from "./+types/browse";
import Card from "../components/card";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export async function loader() {
  const response = await axios.get<[]>("http://localhost:5000/api/reports");
  if (response.status !== 200) {
    throw new Error("Failed to fetch reports");
  }
  return response.data;
}

export default function Browse({ loaderData }: Route.ComponentProps) {
  const reports = loaderData;
  return (
    <>
      <div className="flex flex-col justify-center items-center my-10 gap-4">
        <h1 className="text-2xl md:text-3xl lj:text-4xl font-bold">
          Browse Lost & Found Items
        </h1>
        <div className="w-[140px] h-[4px] bg-black dark:bg-white rounded-full"></div>
      </div>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {reports.map((data, index) => (
            <Card data={data} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
