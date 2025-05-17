import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="h-[calc(100vh-72px)] flex flex-col items-center justify-center">
        <h1 className="font-bold text-7xl/22 tracking-tight flex flex-col items-center justify-center text-center">
          <span>
            We <span className="text-primary">Found</span> It
          </span>
          <span>
            You Got <span className="text-primary">It!</span>
          </span>
        </h1>
      </section>

      {/* Recent Items Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl/12 font-bold">Recent Lost & Found Items</h2>
          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima,
            amet?
          </p>
        </div>
      </section>
    </div>
  );
}
