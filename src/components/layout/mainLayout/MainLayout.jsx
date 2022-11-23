import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useTheme } from "@mui/system";
import { useAuth } from "../../../context/authContext";
import { Box, Grid } from "@mui/material";
import LeftSidebar from "../../navigation/LeftSidebar";
import RightSidebar from "./rightSideBar/RightSidebar";
import NavbarStickyBottom from "../../navigation/NavbarStickyBottom";

const Layout = () => {

  const theme = useTheme();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signIn" />;
  }

  return (
    <>
      <Box
        sx={{
          widows: "100%",
          minHeight: "100vh",
          maxWidth: theme.breakpoints.values.lg,
          margin: "0 auto",
          padding: "0 17px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3}
            sx={{
              display: {
                xxs: "none",
                xs: "block"
              },
            }}
          >
            <LeftSidebar />
          </Grid>
          <Grid item xxs={12} xs={9} sm={7} md={6}
            sx={{
              maxWidth: "600px",
            }}
          >
            <Box
              sx={{
                height: "100vh",
              }}
              component="main"
            >
              <Outlet />
            </Box>
          </Grid>
          <Grid item md={3}
          >
            <RightSidebar />
          </Grid>
        </Grid>
      </Box>
      <NavbarStickyBottom />
    </>
  );
}

export default Layout;