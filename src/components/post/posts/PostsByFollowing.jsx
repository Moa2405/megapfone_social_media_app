import { Box, Typography } from "@mui/material";
import url from "../../../common/url";
import PostSkeleton from "./PostsSkeletons";
import Posts from "./Posts";
import ErrorAlert from "../../alert/ErrorAlert";
import useAxios from "../../../hooks/useAxios"
import { useQuery } from 'react-query';

const PostsByFollowing = () => {

  const axios = useAxios();
  const fetchPostsByFollowing = async () => {
    const { data } = await axios.get(url.posts.getPostsByFollowing);
    return data;
  }

  const { data, isError, isLoading } = useQuery("PostsByFollowing", fetchPostsByFollowing);

  if (isLoading) {
    return <PostSkeleton />
  }

  if (isError) {
    return <ErrorAlert />
  }

  if (!isLoading && !isError && data.length === 0) {
    return <Typography>Start fallowing interesting people</Typography>
  }

  return (
    <>
      <Box sx={{ px: { xxs: "17px", xs: "0px" } }}>
        <Typography color="textSecondary" component="h2" variant="h6">
          Posts by those you follow
        </Typography>
      </Box>
      <Posts posts={data} />
    </>
  );
}

export default PostsByFollowing;