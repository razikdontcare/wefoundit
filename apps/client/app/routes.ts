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
    route("/reports", "./routes/dashboard/reports.tsx"),
    route("/browse", "./routes/browse.tsx"),
    route("/search", "./routes/search.tsx"),
    route("/details/:id", "./routes/details.tsx"),
  ]),
  ...prefix("/dashboard", [
    layout("./layouts/dashboard-layout.tsx", [
      index("./routes/dashboard/home.tsx"),
    ]),
  ]),
] satisfies RouteConfig;