import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import { Container } from "../../components/Container/Container";
import { Section } from "../../components/Section/Section";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import css from "./HomePage.module.css";

function HomePage() {
  return (
    <div>
      <Section>
        <Container>
          <div className={css.HomePageContainer}>
            <WelcomeSection />
            <AdvantagesSection />
          </div>
        </Container>
      </Section>
    </div>
  );
}
export default HomePage;
