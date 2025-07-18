import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/main-layout.tsx", [
    index("./routes/home.tsx"),
    route("/browse", "./routes/browse.tsx"),
    route("/laporan", "./routes/laporan.tsx"),
    route("/search", "./routes/search.tsx"),
    route("/details/:id", "./routes/details.tsx"),
  ]),
  layout("./layouts/chat-layout.tsx", [
    route("/chat/:id?", "./routes/chat.tsx"),
  ]),
  ...prefix("/auth", [
    layout("./layouts/auth-layout.tsx", [
      index("./routes/auth.tsx"),
      route("/reset-password", "./routes/resetPass.tsx"),
      route("/bantuan", "./routes/help.tsx"),
    ]),
  ]),
  ...prefix("/dashboard", [
    layout("./layouts/dashboard-layout.tsx", [
      route("/reports", "./routes/dashboard/reports.tsx"),
      index("./routes/dashboard/home.tsx"),
      ...prefix("/settings", [
        route("/account", "./routes/dashboard/accounts.tsx"),
      ]),
      ...prefix("/admin", [
        route("/reports", "./routes/dashboard/admin/reports.tsx"),
        route("/users", "./routes/dashboard/admin/users.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
