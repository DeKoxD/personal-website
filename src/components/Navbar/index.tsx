import { navRoutes } from "@/routes/data";
import { FC } from "react";
import NavbarItemList from "./NavbarItemList";
import { Container } from "./styles";

const Navbar: FC = () => {
  return (
    <Container>
      <NavbarItemList navRoutes={navRoutes} />
    </Container>
  );
};

export default Navbar;
