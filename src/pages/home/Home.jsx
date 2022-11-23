import url from "../../common/url";
import { Typography } from "@mui/material";
import Posts from "../../components/post/posts/Posts"
import PostSkeleton from "../../components/post/posts/PostsSkeletons";
import ErrorAlert from "../../components/alert/ErrorAlert";
import { useEffect, useState } from "react";
import { useAxiosHook } from "../../hooks/useAxiosHook";
import { usePostsContext } from "../../context/postContext";
import { Box } from "@mui/system";

const Home = () => {

  const { response, error, loading, cancel, fetchData } = useAxiosHook();
  const [posts, setPosts] = useState([]);
  const { postsInContext, setInitialPosts } = usePostsContext();

  const apiUrl = url.posts.allPostsWithAuthorAndReactions;

  useEffect(() => {

    fetchData({
      method: "GET",
      url: apiUrl,
    });

    return () => {
      clearInterval(fetchData);
      cancel();
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setInitialPosts(response);
    }

    return () => {
      mounted = false
    };
  }, [response]);

  return (
    <>
      <Typography component="h1" variant="h3">
        Home
      </Typography>
      <Box sx={{ mt: 4 }}>
        {loading && <PostSkeleton />}
        {error && <ErrorAlert />}
        {!loading && !error && <Posts posts={postsInContext} />}
      </Box>
    </>
  );
}

export default Home;