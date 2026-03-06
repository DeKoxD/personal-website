import Homepage from "@/pages/Homepage";
import { NavRoute } from "@/types/NavRoute";
import { projectInfoToNavRoute } from "@/utilities/functions/NavRouteUtils";

export const navRoutes: NavRoute[] = [
  {
    title: "Home",
    path: "/",
    component: Homepage,
  },
  {
    title: "Projects",
    path: "/projects",
    nestedRoutes: [
      projectInfoToNavRoute({
        title: "Snake React",
        height: 520,
        width: 280,
        path: "/snake-react",
        src: "https://dekoxd.github.io/snake-react/",
      }),
    ],
  },
];
