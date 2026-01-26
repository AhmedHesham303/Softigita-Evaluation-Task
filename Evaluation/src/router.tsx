import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import InfiniteListComponent from "./features/components/InfiniteListComponent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/breed",
    element: <InfiniteListComponent />,
  },
]);
