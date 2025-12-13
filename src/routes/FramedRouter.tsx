import { FC } from "react";
import { Route, Switch } from "wouter";
import FramedPage from "../components/FramedPage";
import Homepage from "../pages/Homepage";
import Microblog from "../pages/Microblog";
import NotFound from "../pages/NotFound";

const FramedRouter: FC = () => (
  <FramedPage>
    <Switch>
      <Route path="/" component={Homepage} />
      <Route path="/microblog" component={Microblog} />
      <Route component={NotFound} />
    </Switch>
  </FramedPage>
);

export default FramedRouter;
