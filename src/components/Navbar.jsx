import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/firebase";
import Swal from "sweetalert2";
import "./Navbar.css";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire({
        position: "center-center",
        color: "white",
        background: "#09090b",
        icon: "success",
        title: "User logged out successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      className="border-b-[0.1px] border-slate-800"
      position="static"
      style={{ backgroundColor: "hsl(var(--background))" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link className="flex" to={"/"}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Poppins",
                fontWeight: 700,
                letterSpacing: "",
                color: "#fff",
                textDecoration: "none",
                marginRight: ".2rem",
              }}
            >
              Recipe
            </Typography>
            <Typography
              variant="h6"
              noWrap
              className="text-orange-500"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Poppins",
                fontWeight: 700,
                letterSpacing: ".1rem",
                textDecoration: "none",
              }}
            >
              Share
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                className="flex flex-col"
                style={{
                  fontFamily: "Poppins",
                  backgroundColor: "hsl(var(--background))",
                }}
                onClick={handleCloseNavMenu}
              >
                <Link to={"/"}>
                  <Button
                    style={{
                      fontFamily: "Poppins",
                      backgroundColor: "hsl(var(--background))",
                    }}
                    sx={{ color: "white", display: "block" }}
                  >
                    Home
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem
                className="flex flex-col"
                style={{
                  fontFamily: "Poppins",
                  backgroundColor: "hsl(var(--background))",
                }}
                onClick={handleCloseNavMenu}
              >
                <Link to={"/recipes"}>
                  <Button
                    style={{
                      fontFamily: "Poppins",
                      backgroundColor: "hsl(var(--background))",
                    }}
                    sx={{ color: "white", display: "block" }}
                  >
                    Recipes
                  </Button>
                </Link>
              </MenuItem>

              <MenuItem
                className="flex flex-col"
                style={{
                  fontFamily: "Poppins",
                  backgroundColor: "hsl(var(--background))",
                }}
                onClick={handleCloseNavMenu}
              >
                <Link to={"/categories"}>
                  <Button
                    style={{
                      fontFamily: "Poppins",
                      backgroundColor: "hsl(var(--background))",
                    }}
                    sx={{ color: "white", display: "block" }}
                  >
                    Categories
                  </Button>
                </Link>
              </MenuItem>

              <MenuItem
                className="flex flex-col"
                style={{
                  fontFamily: "Poppins",
                  backgroundColor: "hsl(var(--background))",
                }}
                onClick={handleCloseNavMenu}
              >
                <Link to={"/about"}>
                  <Button
                    style={{
                      fontFamily: "Poppins",
                      backgroundColor: "hsl(var(--background))",
                    }}
                    sx={{ color: "white", display: "block" }}
                  >
                    About
                  </Button>
                </Link>
              </MenuItem>

              <MenuItem
                className="flex flex-col"
                style={{
                  fontFamily: "Poppins",
                  backgroundColor: "hsl(var(--background))",
                }}
                onClick={handleCloseNavMenu}
              >
                <Link to={"/contact"}>
                  <Button
                    style={{
                      fontFamily: "Poppins",
                      backgroundColor: "hsl(var(--background))",
                    }}
                    sx={{ color: "white", display: "block" }}
                  >
                    Contact
                  </Button>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            <NavLink
              to={"/"}
              className={(e) => {
                return e.isActive ? "orange" : "";
              }}
            >
              <Button
                style={{ fontFamily: "Poppins" }}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 2, display: "block", color: "white" }}
              >
                Home
              </Button>
            </NavLink>

            <NavLink
              to={"/recipes"}
              className={(e) => {
                return e.isActive ? "orange" : "";
              }}
            >
              <Button
                style={{ fontFamily: "Poppins" }}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 2, color: "white", display: "block" }}
              >
                Recipes
              </Button>
            </NavLink>
            <NavLink
              to={"/categories"}
              className={(e) => {
                return e.isActive ? "orange" : "";
              }}
            >
              <Button
                style={{ fontFamily: "Poppins" }}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 2, color: "white", display: "block" }}
              >
                Categories
              </Button>
            </NavLink>
            <NavLink
              to={"/about"}
              className={(e) => {
                return e.isActive ? "orange" : "";
              }}
            >
              <Button
                style={{ fontFamily: "Poppins" }}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 2, color: "white", display: "block" }}
              >
                About
              </Button>
            </NavLink>

            <NavLink
              to={"/contact"}
              className={(e) => {
                return e.isActive ? "orange" : "";
              }}
            >
              <Button
                style={{ fontFamily: "Poppins" }}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 2, color: "white", display: "block" }}
              >
                Contact
              </Button>
            </NavLink>
          </Box>

          {currentUser ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{ color: "black" }}
                    alt={auth.currentUser.displayName}
                    src={auth.currentUser.displayName}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  className="flex flex-col"
                  style={{ backgroundColor: "hsl(var(--background))" }}
                  onClick={handleCloseUserMenu}
                >
                  <Link to={"/profile"}>
                    <Button
                      style={{
                        fontFamily: "Poppins",
                        backgroundColor: "hsl(var(--background))",
                      }}
                      sx={{ color: "white", display: "block" }}
                    >
                      Profile
                    </Button>
                  </Link>
                </MenuItem>
                <MenuItem
                  className="flex flex-col"
                  style={{ backgroundColor: "hsl(var(--background))" }}
                  onClick={handleCloseUserMenu}
                >
                  <Button
                    style={{
                      fontFamily: "Poppins",
                      backgroundColor: "hsl(var(--background))",
                    }}
                    sx={{ color: "white", display: "block" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link to={"/login"}>
              <button className="btn border rounded-md px-3 text-sm py-1 mx-2 cursor-pointer hover:bg-[hsl(var(--muted))]">
                Login
              </button>
            </Link>
          )}

          {!currentUser && (
            <Link to={"/signup"}>
              <button className="btn border rounded-md px-3 text-sm py-1 sm:mx-1 mx-2 bg-white text-black cursor-pointer">
                Signup
              </button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
