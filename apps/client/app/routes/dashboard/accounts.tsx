import type { Route } from "./+types/accounts";
import { Button } from "~/components/ui/button";
import SidebarHeader from "~/components/sidebar-header";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Link, useOutletContext } from "react-router";
import { useState } from "react";
import type { User } from "~/hooks/useSession";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

const breadcrumbLinks = [
  { href: "#", label: "Settings" },
  { label: "Account" },
];

export default function Accounts() {
  const user = useOutletContext<User>();
  const [email, setEmail] = useState(user.email || "");
  const [name, setName] = useState(user.name || "");

  return (
    <>
      <SidebarHeader breadcrumbLinks={breadcrumbLinks} />
      <main className="flex flex-col m-10 gap-4">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="font-bold text-3xl">Account</h1>
          <p>
            Kelola informasi akun kamu. Kamu bisa memperbarui informasi akun
            sesuai kebutuhan.
          </p>
        </div>
        <div className="flex flex-col max-w-2xl mt-6 gap-10">
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="name" className="primary-text">
              Nama
            </Label>
            <Input
              type="text"
              id="name"
              className="bg-neutral-50 dark:bg-neutral-50 text-text dark:text-text py-5"
              placeholder="Krisna Federico Utami"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="email" className="primary-text">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              className="bg-neutral-50 dark:bg-neutral-50 text-text dark:text-text py-5"
              placeholder="yourname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="btn-primary uppercase font-bold tracking-wider cursor-pointer"
              disabled={email === user.email && name === user.name}
            >
              Simpan
            </Button>
            <Button variant={"link"} asChild>
              <Link to={"/dashboard/settings/reset-password"}>
                <span>Reset Password</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
