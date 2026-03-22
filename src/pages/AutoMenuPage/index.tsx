import { NavRoute } from "@/types/NavRoute";
import { generateNavRouteKey } from "@/utilities/functions/NavRouteUtils";
import { FC } from "react";
import { Link } from "wouter";
import {
  Content,
  Description,
  List,
  ListItem,
  Title,
  TitleBox,
  TitleDescription,
} from "./styles";

interface AutoMenuPageProps {
  title?: string;
  description?: string;
  navRoutes: NavRoute[];
}

const AutoMenuPage: FC<AutoMenuPageProps> = ({
  title,
  description,
  navRoutes,
}) => {
  return (
    <Content>
      {title && (
        <TitleBox>
          <Title>{title}</Title>
          {description && <TitleDescription>{description}</TitleDescription>}
        </TitleBox>
      )}
      <List>
        {navRoutes.map((navRoute) => (
          <ListItem key={generateNavRouteKey(navRoute)}>
            <Link href={navRoute.path}>{navRoute.title}</Link>
            {navRoute.description && (
              <Description>{navRoute.description}</Description>
            )}
          </ListItem>
        ))}
      </List>
    </Content>
  );
};

export default AutoMenuPage;
