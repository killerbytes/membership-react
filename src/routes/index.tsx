import { ROUTES } from "@/constants";
import DefaultLayout from "@/layouts/DefaultLayout";
import MainLayout from "@/layouts/MainLayout";
import ToasterLayout from "@/layouts/ToasterLayout";
import Dividends from "@/pages/Dividends";
import Login from "@/pages/Login";
import Main from "@/pages/Main";
import Members from "@/pages/Member";
import NotFound from "@/pages/NotFound";
import Onboarding from "@/pages/Onboarding";
import QR from "@/pages/QR";
import Register from "@/pages/Register";
import { useRoutes } from "react-router-dom";

export const AppRoutes = () => {
  const customRoutes = [
    {
      path: ROUTES.LOGIN,
      element: (
        <ToasterLayout>
          <Login />
        </ToasterLayout>
      ),
    },
    {
      path: ROUTES.REGISTER,
      element: (
        <ToasterLayout>
          <Register />
        </ToasterLayout>
      ),
    },
    {
      path: "/",
      element: (
        <MainLayout>
          <Main />
        </MainLayout>
      ),
    },
    {
      path: ROUTES.DIVIDENDS,
      element: (
        <MainLayout>
          <Dividends />
        </MainLayout>
      ),
    },
    {
      path: ROUTES.ONBOARDING,
      element: (
        <DefaultLayout>
          <Onboarding />
        </DefaultLayout>
      ),
    },
    {
      path: ROUTES.MEMBER,
      element: (
        <MainLayout>
          <Members />
        </MainLayout>
      ),
    },
    {
      path: ROUTES.QR,
      element: (
        <MainLayout>
          <QR />
        </MainLayout>
      ),
    },
    { path: "*", element: <NotFound /> },
  ];

  const element = useRoutes([...customRoutes]);

  return <>{element}</>;
};
