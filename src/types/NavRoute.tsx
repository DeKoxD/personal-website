import { RouteProps } from "wouter";

export type NavRoute = {
  title: string;
  path: string;
  component?: RouteProps["component"];
  children?: RouteProps["children"];
  nestedRoutes?: NavRoute[];
  hidden?: boolean;
};
