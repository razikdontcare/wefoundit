import type { Route } from "./+types/auth";
import { useNavigate } from "react-router";
import Login from "~/components/login";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Auth() {
    const navigate = useNavigate();
  return (
    <>
        <div className="flex flex-row min-h-screen box-primary">
            <Login />
        </div>
    </>
  );
}