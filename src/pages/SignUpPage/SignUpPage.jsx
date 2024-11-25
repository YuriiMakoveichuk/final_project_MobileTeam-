import { AuthFormLayout } from "../../components/AuthFormLayout/AuthFormLayout";
import { Container } from "../../components/Container/Container";
import { Section } from "../../components/Section/Section";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";

export const SignUpPage = () => (
  <Section>
    <Container>
      <AuthFormLayout
        title="Sign Up"
        footerText="Already have account? "
        footerLink="/signin"
        footerLinkText="Sign In"
      >
        <SignUpForm />
      </AuthFormLayout>
    </Container>
  </Section>
);
