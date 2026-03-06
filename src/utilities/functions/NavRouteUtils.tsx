import IFrameWrapper from "@/components/IFrameWrapper";
import { NavRoute } from "@/types/NavRoute";

export function generateNavRouteKey(navRoute: NavRoute): string {
  return [navRoute.title, navRoute.path, navRoute.nestedRoutes?.length].join(
    "-",
  );
}

type ProjectInfo = {
  title: string;
  height: number;
  width: number;
  path: string;
  src: string;
};

export function projectInfoToNavRoute(projectInfo: ProjectInfo): NavRoute {
  return {
    title: projectInfo.title,
    path: projectInfo.path,
    children: (
      <IFrameWrapper
        src={projectInfo.src}
        height={projectInfo.height}
        width={projectInfo.width}
      />
    ),
  };
}
