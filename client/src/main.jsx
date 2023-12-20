import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";

function authorization() {
  const access_token = localStorage.access_token;
  if (!access_token) {
    throw redirect(`/login`);
  }
  return null;
}

function authLogin() {
  const access_token = localStorage.access_token;
  if (access_token) {
    throw redirect(`/`);
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: authLogin,
  },
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: authorization,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
