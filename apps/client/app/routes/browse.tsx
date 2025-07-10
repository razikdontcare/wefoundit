import type { Route } from "./+types/browse";
import Card from "../components/card";
import SmallCard from "./smallcard";
export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Browse() {
  return (
    <>
      <div className="flex flex-col justify-center items-center my-10 gap-4">
        <h1 className="text-4xl font-bold">Browse Lost & Found Items</h1>
        <div className="w-[140px] h-[4px] bg-black dark:bg-white rounded-full"></div>
      </div>
      <div className="container mx-auto max-w-7xl grid grid-cols-3 gap-4 py-4">
        {" "}
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index}>
            <Card />
          </div>
        ))}
      </div>
    </>
  );
}
