import { Box, Hidden, Typography } from "@mui/material";
import PostsByFollowing from "../../components/post/posts/PostsByFollowing";
import PostFeed from "../../components/post/posts/PostFeed";
import { Stack } from "@mui/system";
import PeopleToFollow from "../../components/peopleToFollow/PeopleToFollow";

const Home = () => {

  return (
    <>
      <Stack spacing={4} >
        <Box sx={{ px: { xxs: "17px", xs: "0px" } }}>
          <Typography component="h1" variant="h3">
            Home
          </Typography>
        </Box>
        <Hidden mdUp>
          <PeopleToFollow />
        </Hidden>
        <Stack>
          <PostsByFollowing />
        </Stack>
        <Stack>
          <Box sx={{ px: { xxs: "17px", xs: "0px" } }}>
            <Typography color="textSecondary" component="h2" variant="h6">
              Posts feed
            </Typography>
          </Box>
          <PostFeed />
        </Stack>
      </Stack>
    </>
  );
}

export default Home;