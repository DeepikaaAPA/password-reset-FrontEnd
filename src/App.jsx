import { useState } from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword";
import VerifyResetPassword from "./components/VerifyResetPassword";
import VerifyResetLink from "./components/VerifyResetLink";
import Register from "./components/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/forgot-password",

    element: <ForgotPassword />,
  },
  {
    path: "/reset",

    element: <VerifyResetPassword />,
  },
  {
    path: "/reset/:token",

    element: <VerifyResetLink />,
    loader: tokenLoader,
  },
]);
function App() {
  return (
    <div className="mycontainer border">
      <h1>Welcome!!!</h1>

      <RouterProvider router={router} />
    </div>
  );
}

function tokenLoader({ params }) {
  return params.token;
}

export default App;
