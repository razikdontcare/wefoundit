import Card from "~/components/card";
import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";
import { CompassIcon } from "lucide-react";
import BetIcon from "~/components/icons/bet";
import { Link } from "react-router";

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
        <div className="mx-auto">
          <h2 className="text-4xl/12 font-bold text-center">
            Recent Lost & Found Items
          </h2>
          <div className="flex overflow-x-auto">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-96 mx-4">
                <Card />
              </div>
            ))}
          </div>
          <Button className="ml-16 mt-5 flex items-center">
            <CompassIcon />
            <span>Browse More</span>
          </Button>
        </div>
      </section>

      {/* Additional CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center">
            Find and Return Items, Easily
          </h2>
          <p className="max-w-4xl mx-auto text-center mt-4">
            WeFoundIt memudahkan proses pencarian dan pengembalian barang hilang
            secara cepat, aman, dan berbasis komunitas. Cukup satu langkah untuk
            mulai bantu orang lain — atau dibantu.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <Button className="flex items-center" asChild>
            <Link to={"/submit"}>
              <BetIcon />
              <span>Laporkan Sekarang</span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
