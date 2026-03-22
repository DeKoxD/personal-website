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
    description: "Random personal projects",
    path: "/projects",
    nestedRoutes: [
      projectInfoToNavRoute({
        title: "Snake React",
        description:
          "Simple snake game made in React, where each pixel is a reactive component.",
        height: 520,
        width: 280,
        path: "/snake-react",
        src: "https://dekoxd.github.io/snake-react/",
      }),
      projectInfoToNavRoute({
        title: "Personal Website",
        description: "This website.",
        height: 480,
        width: 640,
        path: "/personal-website",
        src: "/",
      }),
    ],
  },
];
