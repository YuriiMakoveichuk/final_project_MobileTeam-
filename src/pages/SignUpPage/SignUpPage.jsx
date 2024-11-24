import { AuthFormLayout } from "../../components/AuthFormLayuot/AuthFormLayuot";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";


export const SignUpPage = () => (
  <AuthFormLayout
    title="Sign Up"
    footerText="Already have an account? "
    footerLink="/signin"
    footerLinkText="Sign In"
  >
    <SignUpForm />
  </AuthFormLayout>
);
