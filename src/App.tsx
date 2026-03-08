import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ROUTES } from "./constants";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Members from "./pages/Members";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div className="p-4">Loading…</div>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route
              path={ROUTES.MAIN}
              element={
                <MainLayout>
                  <Main />
                </MainLayout>
              }
            />
            <Route
              path={ROUTES.ONBOARDING}
              element={
                <MainLayout>
                  <Onboarding />
                </MainLayout>
              }
            />
            <Route
              path={ROUTES.MEMBER}
              element={
                <MainLayout>
                  <Members />
                </MainLayout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
