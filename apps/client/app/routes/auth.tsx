import type { Route } from "./+types/auth";
import { useNavigate } from "react-router";
import Login from "~/components/signin";
import Register from "~/components/signup";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Auth() {
    const navigate = useNavigate();
  return (
    <>
        <div className="flex flex-row min-h-screen bg-[#1C1F23]">
            <Register />
        </div>
    </>
  );
}