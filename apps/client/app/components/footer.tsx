import { Link } from "react-router";

export default function Footer() {
  const contact = {
    email: "info@wefoundit.id",
    address:
      "Jl. Raya Kampus Unud, Jimbaran, Kec. Kuta Sel., Kabupaten Badung, Bali 80361",
  };

  return (
    <>
      <div className="container mx-auto max-w-xs md:max-w-7xl flex flex-col justify-center py-12 gap-5 md:gap-0">
        <div className="w-full flex flex-col md:flex-row md:justify-between">
          <div className="flex mb-5 md:mb-0">
            <span className="text-xl md:text-4xl flex">
              We<span className="font-bold">Found</span>It
            </span>
          </div>
          <div className="flex flex-col md:items-end gap-3 max-w-xs md:text-end">
            <span className="font-bold text-sm md:text-xl md:mb-3">
              Contact
            </span>
            <Link
              to={`mailto:${contact.email}`}
              className="text-xs md:text-base "
            >
              {contact.email}
            </Link>
            <Link to="#" className="text-xs md:text-base ">
              Jl. Raya Kampus Unud, Jimbaran, Kec. Kuta Sel., Kabupaten Badung,
              Bali 80361
            </Link>
          </div>
        </div>
        <span className="text-xs md:text-base">
          We<span className="font-bold">Found</span>It &copy; Copyright 2025
        </span>
      </div>
    </>
  );
}
