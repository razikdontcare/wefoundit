import type { Route } from "./+types/search";
import { useSearchParams } from "react-router";
import Dropdown from "~/components/dropdown";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Search() {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    return (<>
        <div className="flex flex-col margin y-4 px-16">
            <div className="flex justify-between py-5">
                <h1 className="text-3xl font-bold mb-4 underline">{query}</h1>
                <Dropdown placeHolder="Filter" options={[{ label: "Found", labelValue: "Found"}, { label: "Lost", labelValue: "Lost"}, { label: "Reset Filter", labelValue: "Filter"}]} />
            </div>
            <div className="max-w-4xl mx-auto">
                <p className="text-center text-gray-600 place-content-end">
                    Search results for: <span className="font-semibold">{query}</span>
                </p>
            </div>
        </div>
    </>)
}