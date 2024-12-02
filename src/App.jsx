import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import Loader from "./components/Loader/Loader.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage.jsx"));
const SingInPage = lazy(() => import("./pages/SingInPage/SingInPage.jsx"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage.jsx"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

import "./App.css";
import SharedLayout from "./components/SharedLayout/SharedLayout.jsx";
import RestrictedRoute from "./routes/RestrictedRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors.js";
import { refreshUser } from "./redux/auth/operations.js";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) return <Loader />;

  return (
    <>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<HomePage />} />
              <Route
                path="signup"
                element={<RestrictedRoute component={SignUpPage} />}
              />
                 <Route
                path="signin"
                element={<RestrictedRoute component={SingInPage} />}
              />
              {/* <Route path="tracker" element={<TrackerPage />} /> */}
              <Route
                path="tracker"
                element={<PrivateRoute component={TrackerPage} />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
