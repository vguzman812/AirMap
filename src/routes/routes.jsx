import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/Home/HomePage";
import MapPage from "@/pages/Map/MapPage";
import ErrorPage from "@/pages/Error/ErrorPage";

// Create the router with all the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/map",
    element: <MapPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
