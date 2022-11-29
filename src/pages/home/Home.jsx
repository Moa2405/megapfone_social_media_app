import { Box, Typography } from "@mui/material";
import PostsByFollowing from "../../components/post/posts/PostsByFollowing";
import PostFeed from "../../components/post/posts/PostFeed";
import { Stack } from "@mui/system";

const Home = () => {

  return (
    <>
      <Stack spacing={4} >
        <Box sx={{ px: { xxs: "17px", xs: "0px" } }}>
          <Typography component="h1" variant="h3">
            Home
          </Typography>
        </Box>
        <Stack>
          <PostsByFollowing />
        </Stack>
        <Stack>
          <Typography color="textSecondary" component="h2" variant="h6">
            Posts feed
          </Typography>
          <PostFeed />
        </Stack>
      </Stack>
    </>
  );
}

export default Home;