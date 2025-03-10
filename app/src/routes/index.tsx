import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Calendar } from "../pages/Calendar/Calendar";
import { Today } from "../pages/Tasks/Today";
import { Important } from "../pages/Tasks/Important";
import { Overdue } from "../pages/Tasks/Overdue";
import { Completed } from "../pages/Tasks/Completed";
import { Projects } from "../pages/Projects/Projects";
import { Tags } from "../pages/Tags/Tags";
import { Reports } from "../pages/Reports/Reports";
import { Profile } from "../pages/Profile/Profile";
import { Settings } from "../pages/Settings/Settings";
import { Notifications } from "../pages/Notifications/Notifications";
import Top from "../pages/Top/Top";
import Register from "../pages/Register/Register";
import { useAuthStore } from "../features/auth/store/auth";
import { LoadingOverlay } from "@mantine/core";

const AuthWrapper = () => {
  const { user, token, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  return user && token ? <Home /> : <Navigate to="/login" />;
};

const PublicWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, token, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  return user && token ? <Navigate to="/" /> : children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthWrapper />,
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "tasks/today",
        element: <Today />,
      },
      {
        path: "tasks/important",
        element: <Important />,
      },
      {
        path: "tasks/overdue",
        element: <Overdue />,
      },
      {
        path: "tasks/completed",
        element: <Completed />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "tags",
        element: <Tags />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "setting",
        element: <Settings />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "login",
    element: (
      <PublicWrapper>
        <Top />
      </PublicWrapper>
    ),
  },
  {
    path: "register",
    element: (
      <PublicWrapper>
        <Register />
      </PublicWrapper>
    ),
  },
]);
