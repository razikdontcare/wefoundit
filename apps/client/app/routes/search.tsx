import type { Route } from "./+types/search";
import { useSearchParams } from "react-router";
import Dropdown from "~/components/dropdown";
import Card from "~/components/card";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Search() {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") && searchParams.get("filter");
    return (<>
        <div className="flex flex-col margin px-30">
            <div className="flex justify-between py-7">
                <h1 className="text-3xl font-bold mb-4 underline lowercase">{query}</h1>
                <Dropdown placeHolder="Filter" options={[{ label: "Found", labelValue: "Found"}, { label: "Lost", labelValue: "Lost"}, { label: "Reset Filter", labelValue: "Filter"}]} />
            </div>
            <div className="flex items-center justify-center container mx-auto max-w-7xl grid grid-cols-3 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index}>
                    <Card />
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center mt-10 py-4">
                <p className="text-center text-gray-600 place-content-end">
                    Search results for: <span className="font-semibold lowercase">{query}</span>
                </p>
            </div>
        </div>
    </>)
}