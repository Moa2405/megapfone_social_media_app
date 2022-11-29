import React from "react";
import { Box, Grid, Stack } from "@mui/material";
import SearchBar from "../../../searchBar/SearchBar";
import PeopleYouFollow from "../../../peopleYouFollow/PeopleYouFollow";

const RightSidebar = () => {
  return (
    <Box sx={{ position: "fixed", width: { md: "232px", lg: "286px" }, top: "2rem", display: { xxs: "none", md: "block" } }}>
      <Stack spacing={1}>
        <SearchBar />
        <PeopleYouFollow />
      </Stack>
    </Box>
  );
}

export default RightSidebar;