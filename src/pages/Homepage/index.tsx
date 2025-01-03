import { FC } from "react";
import Body from "../../components/Body";
import { info, linkCategories } from "./data";
import { InfoLabel, InfoValue, Main, Section } from "./style";

const Homepage: FC = () => {
  return (
    <Body>
      <Main>
        <Section>
          <h3>Info</h3>
          <ul>
            {info.map(({ label, value }) => (
              <li key={label + value}>
                <InfoLabel>{label}</InfoLabel>
                <InfoValue>{value}</InfoValue>
              </li>
            ))}
          </ul>
        </Section>
        <Section>
          <h3>Links</h3>
          {linkCategories.map(({ label, links }) => (
            <ul key={label}>
              <h4>{label}</h4>
              {links.map(({ label, href }) => (
                <li>
                  <a key={label + href} href={href} target="_blank">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </Section>
      </Main>
    </Body>
  );
};

export default Homepage;
