import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
index("routes/welcome.tsx"),
route("home", "routes/home.tsx"),
route("maze", "routes/maze.tsx"),
route("solver", "routes/solver.tsx"),
] satisfies RouteConfig;
