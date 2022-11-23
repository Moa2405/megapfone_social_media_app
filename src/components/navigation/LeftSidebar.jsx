import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "@mui/system";
import { useAuth } from "../../context/authContext";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Hidden, Collapse, Divider, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CreatePost from "../post/createPost/CreatePost";
import { useThemeMode } from "../../context/themeContext"
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';


const LeftSidebar = () => {

  const { handleMode } = useThemeMode();
  const theme = useTheme();
  const { logout } = useAuth();
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => setOpenSettings(!openSettings);

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <Box textAlign="center"
        sx={{
          paddingTop: "1rem",
          position: "fixed",
          top: "0",
        }}
      >
        <nav aria-label="main navigation">
          <Stack>
            <Link to="/home" style={{ textDecoration: "none", color: "inherit", backgroundColor: "inherit" }}>
              <ListItemButton sx={{ xs: { justifyContent: "flex-end" } }}>
                <ListItemIcon>
                  {theme.palette.mode === "dark" ? <img src="/logo.svg" alt="Logo" width="40px" /> : <img src="/logo-black.svg" alt="Logo" width="40px" />}
                </ListItemIcon>
              </ListItemButton>
            </Link>
            <List>
              <NavLink to="/home" style={{ textDecoration: "none", backgroundColor: "inherit" }}>
                <ListItemButton sx={{ borderRadius: "0.25rem", margin: ".5rem 0" }}>
                  <ListItemIcon>
                    <HomeIcon fontSize="large" sx={{ color: theme.palette.text.primary }} />
                  </ListItemIcon>
                  <Hidden mdDown>
                    <ListItemText primary="Home" primaryTypographyProps={{ fontSize: "18px", color: theme.palette.text.primary }} />
                  </Hidden>
                </ListItemButton>
              </NavLink>
              <NavLink to="/user/myProfilePage" style={{ textDecoration: "none", backgroundColor: "inherit" }}>
                <ListItemButton sx={{ borderRadius: "0.25rem", margin: ".5rem 0" }}>
                  <ListItemIcon>
                    <PersonIcon fontSize="large" sx={{ color: theme.palette.text.primary }} />
                  </ListItemIcon>
                  <Hidden mdDown>
                    <ListItemText primary="Profile" primaryTypographyProps={{ fontSize: "18px", color: theme.palette.text.primary }} />
                  </Hidden>
                </ListItemButton>
              </NavLink>
              <ListItemButton onClick={handleOpenSettings} sx={{ borderRadius: "0.25rem", margin: ".5rem 0" }}>
                <ListItemIcon>
                  <SettingsIcon fontSize="large" sx={{ color: theme.palette.text.primary }} />
                </ListItemIcon>
                <Hidden mdDown>
                  <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: "18px", color: theme.palette.text.primary }} />
                </Hidden>
                {/* {open ? <ExpandLess /> : <ExpandMore />} */}
              </ListItemButton>
              <Collapse in={openSettings} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItemButton onClick={logout} sx={{ md: { pl: 4 }, borderRadius: "0.25rem" }}>
                    <ListItemIcon>
                      <LogoutIcon sx={{ color: theme.palette.text.primary }} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ fontSize: "18px", color: theme.palette.text.primary }} primary="Sign out" />
                  </ListItemButton>
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
                </List>
              </Collapse>
              <ListItemButton>
                <CreatePost />
              </ListItemButton>
            </List>
          </Stack>
        </nav>
      </Box>
    </Box>
  );
}

export default LeftSidebar;