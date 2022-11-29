import Posts from "../post/posts/Posts";
import { useAxiosHook } from "../../hooks/useAxiosHook";
import url from "../../common/url";
import { useEffect, useState } from "react";
import PostSkeleton from "../post/posts/PostsSkeletons";
import ErrorAlert from "../alert/ErrorAlert";
import { Typography } from "@mui/material";

const UsersProfilePosts = ({ name }) => {

  const { response, error, loading, cancel, fetchData } = useAxiosHook();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchData({
        method: "GET",
        url: url.posts.postsByAuthor(name),
      });

    }

    return () => {
      mounted = false;
      clearInterval(fetchData);

      // cancel();
    }
  }, [name]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      console.log("response", response);
    }

    return () => {
      mounted = false;
    }
  }, [response]);

  if (loading) {
    return <PostSkeleton />
  }

  if (error) {
    return <ErrorAlert />
  }

  if (response.length === 0) {
    return <Typography>This user has no posts yet</Typography>
  }

  return (
    <>
      <Posts posts={response} />
    </>
  );
}

export default UsersProfilePosts;