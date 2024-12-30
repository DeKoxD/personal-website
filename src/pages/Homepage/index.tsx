import { FC } from "react";
import Body from "../../components/Body";
import ThemeSelector from "../../components/ThemeSelector";
import { Footer, Header, Main, Section, Title } from "./style";

const Homepage: FC = () => {
  return (
    <Body>
      <Header>
        <div></div>
        <Title>
          <b>ANDRÉ</b> P<b>A</b>NT<b>A</b>L<b>EÃO</b>
        </Title>
      </Header>
      <Main>
        <Section>
          <h3>Info</h3>
        </Section>
        <Section>
          <h3>Links</h3>
          <ul>
            {Array(15)
              .fill(null)
              .map((_, i) => (
                <li>
                  <a href="#">Item {i}</a>
                </li>
              ))}
          </ul>
        </Section>
      </Main>
      <Footer>
        <div></div>
        <ThemeSelector />
      </Footer>
    </Body>
  );
};

export default Homepage;
