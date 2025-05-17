import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Home() {
  return (
    <>
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="font-bold text-7xl/22 tracking-tight flex flex-col items-center justify-center text-center">
          <span>
            We <span className="text-primary">Found</span> It
          </span>
          <span>
            You Got <span className="text-primary">It!</span>
          </span>
        </h1>
      </div>
    </>
  );
}
