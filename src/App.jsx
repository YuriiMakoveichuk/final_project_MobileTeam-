import "./App.css";
import UserBarPopover from "./components/UserBarPopover/UserBarPopover.jsx";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage.jsx";

function App() {
  return (
    <>
      <SignUpPage />
      <UserBarPopover />
    </>
  );
}

export default App;
