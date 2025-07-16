import { FC, Fragment } from "react";
import { info, linkCategories } from "./data";
import { InfoLabel, InfoValue, Main, Section } from "./styles";

const Homepage: FC = () => {
  return (
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
        {linkCategories.flatMap(({ label, links }) => (
          <Fragment key={label}>
            {linkCategories.length > 1 && <h4>{label}</h4>}
            <ul key={label}>
              {links.map(({ label, href }) => (
                <li key={label + href}>
                  <a href={href} target="_blank">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </Section>
    </Main>
  );
};

export default Homepage;
