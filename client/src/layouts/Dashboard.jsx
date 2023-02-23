import AppBar from "../components/AppBar.jsx";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom"

function Dashboard() {
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
