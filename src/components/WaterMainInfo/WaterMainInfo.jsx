import { AddWaterBtn } from "./AddWaterBtn/AddWaterBtn";
import { WaterDailyNorma } from "./WaterDailyNorma/WaterDailyNorma";
import { WaterProgressBar } from "./WaterProgressBar/WaterProgressBar";
import styles from './WaterMainInfo.module.css';
import { Container } from "../Container/Container";
import { Section } from "../Section/Section";

export const WaterMainInfo = () => {
 return (
  <Container>
    <Section>
      <div className={styles.box}>
          <h2 className={styles.title}>Aquatrack</h2>
          <WaterDailyNorma />
          <WaterProgressBar />
          <AddWaterBtn />
        </div>
    </Section>
  </Container>
 );
}
