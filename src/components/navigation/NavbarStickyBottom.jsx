import { useState } from "react";
import { useAuth } from "../../context/authContext";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTheme } from "@mui/system";
import LogoutIcon from '@mui/icons-material/Logout';
import { useThemeMode } from "../../context/themeContext"
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';

import CreatePost from "../post/createPost/CreatePost";

const NavbarStickyBottom = () => {

  const theme = useTheme();

  const { handleMode } = useThemeMode();
  const { logout } = useAuth();
  const handleLogout = () => logout();


  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper sx={{ display: { xs: "none" }, position: "fixed", bottom: "0", width: "100%", zIndex: "1000", padding: "17px 14px", }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <NavLink to="/" style={{ textDecoration: "none", color: "inherit", backgroundColor: "inherit" }}>
          <HomeIcon fontSize="large" color="action" />
        </NavLink>
        <NavLink to="/profile" style={{ textDecoration: "none", color: "inherit", backgroundColor: "inherit" }}>
          <PersonIcon fontSize="large" color="action" />
        </NavLink>
        <CreatePost createPost={true} />
        <SearchIcon fontSize="large" color="action" />
        {/* <SettingsIcon fontSize="large" color="action" /> */}
        <div>
          <IconButton
            size="large"
            aria-label="setting"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <SettingsIcon fontSize="large" color="action" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              {theme.palette.mode === "dark" ? (
                <ListItemButton onClick={handleMode} sx={{ md: { pl: 4 }, borderRadius: "0.25rem" }}>
                  <ListItemIcon>
                    <WbSunnyIcon />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ fontSize: "18px", color: theme.palette.action.active }} primary="Light mode" />
                </ListItemButton>
              ) : (
                <ListItemButton onClick={handleMode} sx={{ md: { pl: 4 }, borderRadius: "0.25rem" }}>
                  <ListItemIcon>
                    <Brightness2Icon />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ fontSize: "18px", color: theme.palette.action.active }} primary="Dark mode" />
                </ListItemButton>
              )}
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemButton onClick={handleLogout} sx={{ md: { pl: 4 }, borderRadius: "0.25rem" }}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: "18px", color: theme.palette.action.active }} primary="Sign out" />
              </ListItemButton>
            </MenuItem>
          </Menu>
        </div>
      </Stack>
    </Paper>
  );
}



export default NavbarStickyBottom;

{/* <SettingsIcon onClick={handleOpenSettings} fontSize="large" color="action" />
        <Collapse orientation="vertical" in={openSettings} timeout="auto" unmountOnExit>
          <Divider />
          <List component="div" disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ md: { pl: 4 }, borderRadius: "0.25rem" }}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "18px", color: theme.palette.action.active }} primary="Sign out" />
            </ListItemButton>
          </List>
        </Collapse> */}