import { Link } from "react-router";

export default function Footer() {
  const contact = {
    email: "info@wefoundit.id",
    address:
      "Jl. Raya Kampus Unud, Jimbaran, Kec. Kuta Sel., Kabupaten Badung, Bali 80361",
  };

  return (
    <>
      <div className="container mx-auto flex flex-col justify-center py-12">
        <div className="w-full flex justify-between">
          <div className="flex">
            <span className="text-4xl flex">
              We<span className="font-bold">Found</span>It
            </span>
          </div>
          <div className="flex flex-col items-end gap-3 max-w-xs text-end">
            <span className="font-bold text-xl mb-3">Contact</span>
            <Link to={`mailto:${contact.email}`}>{contact.email}</Link>
            <Link to="#">
              Jl. Raya Kampus Unud, Jimbaran, Kec. Kuta Sel., Kabupaten Badung,
              Bali 80361
            </Link>
          </div>
        </div>
        <span>
          We<span className="font-bold">Found</span>It &copy; Copyright 2025
        </span>
      </div>
    </>
  );
}
