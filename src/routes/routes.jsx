import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Map from "@/pages/Map/Map";
import ErrorPage from "@/pages/Error/Error";

// Create the router with all the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/map",
    element: <Map />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
