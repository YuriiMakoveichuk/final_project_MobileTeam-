import { Container } from "../../components/Container/Container.jsx";
import { Section } from "../../components/Section/Section.jsx";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";

import css from "./TrackerPage.module.css";
const TrackerPage = () => {
  return (
    <>
      <Section>
        <Container>
          <div className={css.box}>
            <WaterMainInfo />
            <WaterDetailedInfo />
          </div>
        </Container>
      </Section>
    </>
  );
};

export default TrackerPage;
