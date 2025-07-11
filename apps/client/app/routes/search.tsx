import type { Route } from "./+types/search";
import Dropdown from "~/components/dropdown";
import Card from "~/components/card";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  // const filter = url.searchParams.get("filter");

  // Return empty if no query
  if (!query.trim()) {
    return { query, data: [] };
  }

  try {
    // Use fallback URL for API
    const apiUrl = process.env.API_URL || "http://localhost:5000";
    
    //   Example API call (uncomment and adjust as needed)
    const response = await axios.get<{ data: any[] }>(
      `${apiUrl}/api/search`,
      {
        params: { q: query },
        timeout: 10000,
      }
    );

    console.log(response.data); // Log the response data for debugging

    // Handle different response structures
    const data = response.data?.data || response.data || [];
    
    return { query, data: Array.isArray(data) ? data : [] };
    
  } catch (error) {
    console.error("Search API error:", error);
    
    // Return empty data on error for now
    return { query, data: [] };
  }
}

export default function Search({ loaderData }: Route.ComponentProps) {
  const { query, data } = loaderData;
  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold underline lowercase">
            {query || "Search Results"}
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
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((d, index) => (
              <div key={d.id || index} className="flex justify-center">
                <Card data={d} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <p className="text-gray-500 text-lg">No results found</p>
            {query && (
              <p className="text-gray-400 text-sm mt-2">
                Try searching with different keywords
              </p>
            )}
          </div>
        )}
        {query && (
          <div className="flex justify-center items-center mt-10 py-4">
            <p className="text-center text-gray-600">
              Search results for:{" "}
              <span className="font-semibold lowercase">{query}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
