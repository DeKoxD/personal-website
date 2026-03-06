import { NavRoute } from "@/types/NavRoute";
import { generateNavRouteKey } from "@/utilities/functions/NavRouteUtils";
import { FC } from "react";
import { Link } from "wouter";

function concatPath(...paths: string[]): string {
  return (
    "/" +
    paths
      .map((path) => path.replace(/^\/+|\/+$/g, ""))
      .filter((path) => !!path)
      .join("/")
  );
}

interface NavbarItemListProps {
  navRoutes: NavRoute[];
  basePath?: string;
  depth?: number;
}

const NavbarItemList: FC<NavbarItemListProps> = ({
  navRoutes,
  basePath = "/",
  depth = 0,
}) => {
  return (
    <ul>
      {navRoutes
        .filter((navRoute) => !navRoute.hidden)
        .map((navRoute) => (
          <li key={generateNavRouteKey(navRoute)}>
            {`${new Array(Math.max(depth - 1, 0)).fill("| ").join("")}${depth > 0 ? "|-" : ""}`}
            <Link
              key={generateNavRouteKey(navRoute)}
              className={(active) => (active ? "active" : "")}
              href={concatPath(basePath, navRoute.path)}
            >
              {navRoute.title}
            </Link>
            {!!navRoute.nestedRoutes?.length && (
              <NavbarItemList
                navRoutes={navRoute.nestedRoutes}
                basePath={concatPath(basePath, navRoute.path)}
                depth={depth + 1}
              />
            )}
          </li>
        ))}
    </ul>
  );
};

export default NavbarItemList;
