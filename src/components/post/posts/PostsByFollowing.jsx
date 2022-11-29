import { Box, Typography } from "@mui/material";
import { useAuth } from "../../../context/authContext";
import { useEffect, useState } from "react";
import { useAxiosHook } from "../../../hooks/useAxiosHook";
import url from "../../../common/url";
import PostSkeleton from "./PostsSkeletons";
import Posts from "./Posts";
import ErrorAlert from "../../alert/ErrorAlert";

const PostsByFollowing = () => {

  const { response, error, loading, cancel, fetchData } = useAxiosHook();

  useEffect(() => {
    let mounted = true;
    console.log("post following mounted");

    fetchData({
      method: "GET",
      url: url.posts.getPostsByFollowing
    });

    return () => {
      mounted = false;
      clearInterval(fetchData);
      // cancel();
    }
  }, []);

  if (loading) {
    return <PostSkeleton />
  }

  if (error) {
    return <ErrorAlert />
  }

  if (!loading && !error && response.length === 0) {
    return <Typography>Start fallowing interesting people</Typography>
  }

  return (
    <>
      <Box sx={{ px: { xxs: "17px", xs: "0px" } }}>
        <Typography color="textSecondary" component="h2" variant="h6">
          Posts by those you follow
        </Typography>
      </Box>
      <Posts posts={response} />
    </>
  );
}

export default PostsByFollowing;