import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";

export default function CheckGuest({ children }) {
  const token = Cookie.get("token");
  return !token ? children : <Navigate to="/" />;
}
