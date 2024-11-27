import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "./components/Loader/Loader.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage.jsx"));
const SingInPage = lazy(() => import("./pages/SingInPage/SingInPage.jsx"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage.jsx"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

import "./App.css";
import UserPanel from "./components/UserPanel/UserPanel.jsx";

function App() {
  return (
    <>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SingInPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <UserPanel />
    </>
  );
}

export default App;
