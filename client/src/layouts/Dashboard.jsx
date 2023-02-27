import AppBar from "../components/AppBar.jsx";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { setUser } from "../store/auth.js";
import { useDispatch } from "react-redux";

function Dashboard() {
  const token = Cookie.get("token");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    const res = await fetch(process.env.REACT_APP_API_URL + "/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (res.ok) {
      const user = await res.json();
      console.log("from dashboard", user);
      dispatch(setUser(user));
    } else {
      Cookie.remove("token");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);
  if (loading) {
    return (
      <p>
        <i>Loading...</i>
      </p>
    );
  }
  return (
    <>
      <AppBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Dashboard;
