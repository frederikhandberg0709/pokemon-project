import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/pokedex.tsx"),
  {
    path: "/pokemon/:id",
    file: "routes/pokemon-details.tsx",
  },
] satisfies RouteConfig;
