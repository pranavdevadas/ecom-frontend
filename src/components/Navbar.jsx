import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logout } from "../firebase";

function Navbar() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);

  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setAuth(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleNavigate = (path) => {
    setAnchorElNav(null);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingBagIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            SHOPPI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {["/clothes", "/electronics", "/furnitures", "/shoes"].map(
                (path, index) => (
                  <MenuItem key={index} onClick={() => handleNavigate(path)}>
                    <Typography textAlign="center">
                      {path.replace("/", "").charAt(0).toUpperCase() +
                        path.slice(2)}
                    </Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>

          <ShoppingBagIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            onClick={() => navigate("/")}
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            SHOPPI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {["Clothes", "Electronics", "Furnitures", "Shoes"].map(
              (item, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleNavigate(`/${item.toLowerCase()}`)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {item}
                </Button>
              )
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              onClick={auth ? handleLogout : () => navigate("/login")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {auth ? "Logout" : "Login"}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
