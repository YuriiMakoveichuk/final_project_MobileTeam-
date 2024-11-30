import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import { AuthFormLayout } from '../../components/AuthFormLayout/AuthFormLayout';
import { Container } from '../../components/Container/Container';
import { Section } from '../../components/Section/Section';
import { SignInForm } from '../../components/SignInForm/SignInForm';

export const SignInPage = () => (
  <Section>
    <Container>
      <AuthFormLayout
        title="Sign In"
        footerText="Don't have an account?"
        footerLink="/signup"
        footerLinkText="Sign Up"
      >
        <SignInForm />
      </AuthFormLayout>
      <AdvantagesSection />
    </Container>
  </Section>
);
