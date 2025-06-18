import type { Route } from "./+types/browse";

export function meta({}: Route.MetaArgs) {
return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Browse (){
    return (<>
    <h1>Browse</h1>
    </>)
}
