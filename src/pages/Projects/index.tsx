import { FC } from "react";
import { Link } from "wouter";
import { projects } from "./data";
import { Content } from "./styles";

const Projects: FC = () => {
  return (
    <Content>
      {projects.map((project) => (
        <Link key={project.src} href={project.path}>
          {project.title}
        </Link>
      ))}
    </Content>
  );
};

export default Projects;
