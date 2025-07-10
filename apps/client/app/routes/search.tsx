import type { Route } from "./+types/search";
import { useSearchParams } from "react-router";
import Dropdown from "~/components/dropdown";
import Card from "~/components/card";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-10 py-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold underline lowercase">{query}</h1>
        <Dropdown
          placeHolder="Filter"
          options={[
            { label: "Found", labelValue: "Found" },
            { label: "Lost", labelValue: "Lost" },
            { label: "Reset Filter", labelValue: "Filter" },
          ]}
        />
      </div>

      {/* Card Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index} />
        ))}
      </div>

      {/* Footer Section */}
      <div className="flex justify-center items-center mt-10 py-4">
        <p className="text-center text-gray-600">
          Search results for: <span className="font-semibold lowercase">{query}</span>
        </p>
      </div>
    </div>
  );
}
