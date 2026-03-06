import AutoMenuPage from "@/pages/AutoMenuPage";
import { NavRoute } from "@/types/NavRoute";
import { FC } from "react";
import { Route, Switch } from "wouter";
import { generateNavRouteKey } from "./functions/NavRouteUtils";

function parseRoute(navRoute: NavRoute, notFoundComponent: FC) {
  const key = generateNavRouteKey(navRoute);
  console.log(key, navRoute);

  if (navRoute.nestedRoutes?.length) {
    return (
      <Route key={key} path={navRoute.path} nest>
        <Switch>
          {navRoute.component || navRoute.children ? (
            <Route
              key={key}
              path="/"
              component={navRoute.component}
              children={navRoute.children}
            />
          ) : (
            navRoute.nestedRoutes?.length && (
              <Route key={key} path="/">
                <AutoMenuPage navRoutes={navRoute.nestedRoutes} />
              </Route>
            )
          )}
          {navRoute.nestedRoutes.map((nr) => parseRoute(nr, notFoundComponent))}
          <Route component={notFoundComponent} />
        </Switch>
      </Route>
    );
  }

  return (
    <Route
      key={key}
      path={navRoute.path}
      component={navRoute.component}
      children={navRoute.children}
    />
  );
}

const NavRouteParser: FC<{
  navRoutes: NavRoute[];
  notFoundComponent: FC;
}> = ({ navRoutes, notFoundComponent }) => {
  switch (navRoutes.length) {
    case 0:
      return <></>;
    case 1:
      return (
        <Switch>
          <Route
            key={generateNavRouteKey(navRoutes[0])}
            path={navRoutes[0].path}
            component={navRoutes[0].component}
            children={navRoutes[0].children}
          />
          <Route component={notFoundComponent} />
        </Switch>
      );
    default:
      return (
        <Switch>
          {navRoutes.map((nr) => parseRoute(nr, notFoundComponent))}
          <Route component={notFoundComponent} />
        </Switch>
      );
  }
};

export default NavRouteParser;
