import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";
import { CompassIcon } from "lucide-react";
import BetIcon from "~/components/icons/bet";
import { Link } from "react-router";
import SmallCard from "~/components/smallcard";
import Marquee from "~/components/Marquee";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export async function clientLoader() {
  const response = await axios.get<[]>(
    import.meta.env.VITE_API_URL + "/api/reports"
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch reports");
  }
  return response.data;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const reports = loaderData;
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="h-[calc(100vh-72px)] flex flex-col items-center justify-center">
        <h1 className="font-bold text-5xl/14 md:text-7xl/22 tracking-tight flex flex-col items-center justify-center text-center">
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
          <h2 className="text-2xl md:text-4xl/12 font-bold text-center">
            Recent Lost & Found Items
          </h2>
          <Marquee duration={15} className=" mt-16">
            {reports.map((data, index) => (
              <div key={index} className="flex-shrink-0 w-96 mx-4">
                <SmallCard data={data} />
              </div>
            ))}
          </Marquee>
          <Button className="ml-4 md:ml-16 mt-5 flex items-center">
            <CompassIcon />
            <span>Browse More</span>
          </Button>
        </div>
      </section>

      {/* Additional CTA Section */}
      <section className="py-20">
        <div className="max-w-xs md:max-w-7xl mx-auto">
          <h2 className="text-xl md:text-5xl font-bold text-center">
            Find and Return Items, Easily
          </h2>
          <p className="text-xs md:text-base md:max-w-4xl mx-auto text-center mt-4">
            WeFoundIt memudahkan proses pencarian dan pengembalian barang hilang
            secara cepat, aman, dan berbasis komunitas. Cukup satu langkah untuk
            mulai bantu orang lain — atau dibantu.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <Button className="flex items-center" asChild>
            <Link to={"/laporan"} className="text-xs md:text-base">
              <BetIcon />
              <span>Laporkan Sekarang</span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
