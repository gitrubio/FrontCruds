import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Tooltip } from '@mui/material';
import icon from '../images/icon.png'



const NavBar = () => {


  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [orientacion, setOrientacion] = React.useState('PLATOS')
  const pages = [
    { label: orientacion, path: `/crear${orientacion}` },
    { label: `CREAR ${orientacion}`, path: `/${orientacion}` },
  ];
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    if(window.location.href.includes('crear')){
      navigate(`/crear${orientacion}`)
    }else{
      navigate(`/${orientacion}`)
    }
  },[navigate, orientacion])
  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <NavLink
                    key={page.label}
                    style={{ textDecoration: "none" }}
                    to={page.path}
                  >
                    <Button
                      key={page.label}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "blue", display: "block" }}
                    >
                      <Typography textAlign="center">{page.label}</Typography>
                    </Button>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <>
              {" "}
              {pages.map((page) => (
                <NavLink
                  key={page.label}
                  style={{ textDecoration: "none" }}
                  to={page.path}
                >
                  <Button
                    key={page.label}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.label}
                  </Button>
                </NavLink>
              ))}
            </>
          </Box>
          <div className="px-5">
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setOrientacion(e.target.value);
              }}
            >
              <option selected value="PLATOS">
                Platos
              </option>
              <option value="TAREAS">Tareas</option>
            </select>
          </div>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="MuebleApp">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={icon} />
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
            ></Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}; export default NavBar
