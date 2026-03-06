import FramedBody from "@/components/FramedBody";
import NotFound from "@/pages/NotFound";
import { FC } from "react";
import NavRouteParser from "../utilities/NavRouteParser";
import { navRoutes } from "./data";

const FramedRouter: FC = () => (
  <FramedBody>
    <NavRouteParser navRoutes={navRoutes} notFoundComponent={NotFound} />
  </FramedBody>
);

export default FramedRouter;
