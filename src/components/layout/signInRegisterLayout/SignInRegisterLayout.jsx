import { Box, Container, Stack } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";
import { useTheme } from "@mui/system";
import { useAuth } from "../../../context/authContext";

const SignInRegisterLayout = () => {

  const theme = useTheme()
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />
  }

  return (
    // This is the layout for the sign in and register pages 
    //with the image social-media-welcome.jpg on the left and the form on the right
    <Container maxWidth="lg">
      <Stack
        width="100%"
        spacing={4}
        direction="row"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box
          sx={{
            display: "none",
            "@media (min-width: 960px)": {
              display: "block",
            },
          }}
        >
          <img
            src="/social-media-welcome.jpg"
            alt="social media welcome"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <div style={{ margin: "0px", padding: "0px", width: "100%", display: "flex", justifyContent: "center" }}>
          <Outlet />
        </div>
      </Stack>
    </Container>
  );
}

export default SignInRegisterLayout;