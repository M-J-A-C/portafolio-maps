import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Portafolio Maps
        </Typography>
        <Button color="inherit" component={Link} to="/">Inicio</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
