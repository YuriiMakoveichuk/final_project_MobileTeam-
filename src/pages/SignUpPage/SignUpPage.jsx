import { AuthFormLayout } from "../../components/AuthFormLayout/AuthFormLayout";
import { Container } from "../../components/Container/Container";
import { Section } from "../../components/Section/Section";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";

const SignUpPage = () => {
  return (
    <Section>
      <Container>
        <AuthFormLayout
          title="Sign Up"
          footerText="Already have account?"
          footerLink="/signin"
          footerLinkText="Sign In"
          paddingMd="170px 16px"
          paddingLg="227px 134px"
          paddingXl="130px 118px 100px"
        >
          <SignUpForm />
        </AuthFormLayout>
      </Container>
    </Section>
  );
};

export default SignUpPage;
