import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
