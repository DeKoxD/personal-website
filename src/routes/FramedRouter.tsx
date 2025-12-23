import { FC } from "react";
import { Route, Switch } from "wouter";
import FramedBody from "../components/FramedBody";
import Homepage from "../pages/Homepage";
import NotFound from "../pages/NotFound";

const FramedRouter: FC = () => (
  <FramedBody>
    <Switch>
      <Route path="/" component={Homepage} />
      <Route component={NotFound} />
    </Switch>
  </FramedBody>
);

export default FramedRouter;
