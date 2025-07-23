import { FC } from "react";
import { Route, Switch } from "wouter";
import Body from "../components/Body";
import Homepage from "../pages/Homepage";
import NotFound from "../pages/NotFound";

const FramedRouter: FC = () => (
  <Body>
    <Switch>
      <Route path="/" component={Homepage} />
      <Route component={NotFound} />
    </Switch>
  </Body>
);

export default FramedRouter;
