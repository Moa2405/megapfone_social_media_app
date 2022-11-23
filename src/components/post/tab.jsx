import React from "react";
import { Box, Grid } from "@mui/material";
import SearchBar from "./SearchBar";
import PeopleToFollow from "./PeopleToFollow";

const RightSidebar = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        paddingTop: "1rem",
        display: {
          xxs: "none",
          md: "block",
        },
      }}
    >
      <Grid
        container
        direction="column"
        gap={1}
      >
        <SearchBar />
        <PeopleToFollow />
      </Grid>

    </Box>
  );
}

export default RightSidebar;