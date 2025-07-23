import { FC } from "react";
import { Route, Switch } from "wouter";
import FramedRouter from "./FramedRouter";

const MainRouter: FC = () => (
  <Switch>
    <Route component={FramedRouter} />
  </Switch>
);

export default MainRouter;
