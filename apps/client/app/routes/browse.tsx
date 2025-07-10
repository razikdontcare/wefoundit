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

      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
