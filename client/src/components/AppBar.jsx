import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { removeUser } from "../store/auth.js";
import { useDispatch } from "react-redux";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    Cookie.remove("token");
    dispatch(removeUser());
    navigate("/login");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="text-white" to="/">
              Expenders
            </Link>
          </Typography>
          <Button color="inherit">
            <Link className="text-white" to="/categories">
              Categories
            </Link>
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
