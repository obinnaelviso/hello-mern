import Dashboard from "./layouts/Dashboard";
import Auth from "./layouts/Auth";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { createBrowserRouter } from "react-router-dom";
import CheckAuth from "./utils/CheckAuth.jsx";
import CheckGuest from "./utils/CheckGuest.jsx";

export default createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: (
          <CheckAuth>
            <Home />
          </CheckAuth>
        ),
      },
      {
        path: "/categories",
        element: (
          <CheckAuth>
            <Category />
          </CheckAuth>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "/login",
        element: (
          <CheckGuest>
            <Login />
          </CheckGuest>
        ),
      },
      {
        path: "/register",
        element: (
          <CheckGuest>
            <Register />
          </CheckGuest>
        ),
      },
    ],
  },
]);
