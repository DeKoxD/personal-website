import FramedBody from "@/components/FramedBody";
import Homepage from "@/pages/Homepage";
import NotFound from "@/pages/NotFound";
import { FC } from "react";
import { Route, Switch } from "wouter";
import ProjectsRouter from "./ProjectsRouter";

const FramedRouter: FC = () => (
  <FramedBody>
    <Switch>
      <Route path="/" component={Homepage} />
      <Route path="/projects" nest component={ProjectsRouter} />
      <Route path="/test-overflow">
        {Array(100)
          .fill(null)
          .map((_a, i) => (
            <span key={i}>
              {i}
              <br />
            </span>
          ))}
      </Route>
      <Route component={NotFound} />
    </Switch>
  </FramedBody>
);

export default FramedRouter;
