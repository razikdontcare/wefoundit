import { type RouteConfig, index, layout, route, prefix } from "@react-router/dev/routes";

export default [
  layout("./layouts/main-layout.tsx", [
    index("./routes/home.tsx"),
    route("/browse", "./routes/browse.tsx"),
    route("/search", "./routes/search.tsx"),

  ]),
] satisfies RouteConfig;

// array = [a, b, c]
// ...array
// for (const item of array) {
//   console.log(item);