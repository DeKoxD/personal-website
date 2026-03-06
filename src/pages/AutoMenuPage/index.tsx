import { NavRoute } from "@/types/NavRoute";
import { generateNavRouteKey } from "@/utilities/functions/NavRouteUtils";
import { FC } from "react";
import { Link } from "wouter";
import { Content, List, ListItem } from "./styles";

interface AutoMenuPageProps {
  navRoutes: NavRoute[];
}

const AutoMenuPage: FC<AutoMenuPageProps> = ({ navRoutes }) => {
  return (
    <Content>
      <List>
        {navRoutes.map((navRoute) => (
          <ListItem key={generateNavRouteKey(navRoute)}>
            <Link href={navRoute.path}>{navRoute.title}</Link>
          </ListItem>
        ))}
      </List>
    </Content>
  );
};

export default AutoMenuPage;
