import type { Route } from "./+types/search";
import Dropdown from "~/components/dropdown";
import Card from "~/components/card";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");
  // const filter = url.searchParams.get("filter");

  //   Example API call (uncomment and adjust as needed)
  const response = await axios.get<{ data: any[] }>(
    `${import.meta.env.VITE_API_URL}/api/search`,
    {
      params: { q: query },
    }
  );

  // return response.data;

  return { query, data: response.data.data }; // Return the query for rendering
}

export default function Search({ loaderData }: Route.ComponentProps) {
  const { query, data } = loaderData;
  return (
    <>
      <div className="flex flex-col margin px-30">
        <div className="flex justify-between py-7">
          <h1 className="text-3xl font-bold mb-4 underline lowercase">
            {query}
          </h1>
          <Dropdown
            placeHolder="Filter"
            options={[
              { label: "Found", labelValue: "Found" },
              { label: "Lost", labelValue: "Lost" },
              { label: "Reset Filter", labelValue: "Filter" },
            ]}
          />
        </div>
        {data.length > 0 ? (
          <>
            <div className="flex items-center justify-center container mx-auto max-w-7xl grid grid-cols-3 gap-4">
              {data.map((d, index) => (
                <div key={index}>
                  <Card data={d} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <p className="text-gray-500 text-lg">No results found</p>
          </div>
        )}
        <div className="flex justify-center items-center mt-10 py-4">
          <p className="text-center text-gray-600 place-content-end">
            Search results for:{" "}
            <span className="font-semibold lowercase">{query}</span>
          </p>
        </div>
      </div>
    </>
  );
}
