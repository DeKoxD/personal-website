import IFrameWrapper from "@/components/IFrameWrapper";
import Projects from "@/pages/Projects";
import { projects } from "@/pages/Projects/data";
import { FC } from "react";
import { Route, Switch } from "wouter";

const ProjectsRouter: FC = () => (
  <Switch>
    {projects.map((project) => (
      <Route key={project.src} path={project.path}>
        <IFrameWrapper
          src={project.src}
          height={project.height}
          width={project.width}
        />
      </Route>
    ))}
    <Route component={Projects} />
  </Switch>
);

export default ProjectsRouter;
