import { AuthFormLayout } from "../../components/AuthFormLayout/AuthFormLayout.jsx";
import { Container } from "../../components/Container/Container.jsx";
import { Section } from "../../components/Section/Section.jsx";
import { SignInForm } from "../../components/SignInForm/SignInForm.jsx";

const SingInPage = () => {
  return (
    <>
      <Section>
        <Container>
          <AuthFormLayout
            title="Sign In"
            footerText="Don't have an account?"
            footerLink="/signup"
            footerLinkText="Sign Up"
            paddingMd="216px 16px"
            paddingLg="281px 134px"
            paddingXl="169px 118px"
          >
            <SignInForm />
          </AuthFormLayout>
        </Container>
      </Section>
    </>
  );
};

export default SingInPage;
