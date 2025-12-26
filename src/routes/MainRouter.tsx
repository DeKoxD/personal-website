import FramedRouter from "@/routes/FramedRouter";
import { FC } from "react";
import { Route, Switch } from "wouter";

const MainRouter: FC = () => (
  <Switch>
    <Route component={FramedRouter} />
  </Switch>
);

export default MainRouter;
