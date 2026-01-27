import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import BreedsPage from "./pages/BreedsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/breed",
    element: <BreedsPage />,
  },
]);
