import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie"

export default function ButtonAppBar() {
  const navigate = useNavigate();
  
  function logout() {
    Cookie.remove('token')
    navigate("/login")
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
            <Link to="/login" className="text-white">
              Login
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
