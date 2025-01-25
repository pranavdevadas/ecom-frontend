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
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { logout } from "../firebase";

function Navbar() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuth(user ? true : false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleElectronics = () => {
    setAnchorElUser(null);
    navigate("/electronics");
  };

  const handleClothes = () => {
    setAnchorElUser(null);
    navigate("/clothes");
  };

  const handleShoes = () => {
    setAnchorElUser(null);
    navigate("/shoes");
  };
  const handleFurnitures = () => {
    setAnchorElUser(null);
    navigate("/furnitures");
  };
  const handleLogout = () => {
    setAnchorElUser(null);
    logout();
  };

  const handleTitle = () => {
    setAnchorElUser(null);
    navigate("/");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
            component="a"
            onClick={handleTitle}
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SHOPPI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={handleClothes}>
                <Typography sx={{ textAlign: "center" }}>Clothes</Typography>
              </MenuItem>
              <MenuItem onClick={handleElectronics}>
                <Typography sx={{ textAlign: "center" }}>
                  Electronics
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleFurnitures}>
                <Typography sx={{ textAlign: "center" }}>Furnitures</Typography>
              </MenuItem>
              <MenuItem onClick={handleShoes}>
                <Typography sx={{ textAlign: "center" }}>Shoes</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <ShoppingBagIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            onClick={handleTitle}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SHOPPI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleClothes}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Cloths
            </Button>
            <Button
              onClick={handleElectronics}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Electronic
            </Button>
            <Button
              onClick={handleFurnitures}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Furniture
            </Button>
            <Button
              onClick={handleShoes}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Shoes
            </Button>
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
