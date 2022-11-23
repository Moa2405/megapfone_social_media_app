import Posts from "../post/posts/Posts";
import { useAxiosHook } from "../../hooks/useAxiosHook";
import url from "../../common/url";
import { useEffect, useState } from "react";
import PostSkeleton from "../post/posts/PostsSkeletons";
import ErrorAlert from "../alert/ErrorAlert";
import { Typography } from "@mui/material";

const UsersProfilePosts = ({ name }) => {

  const { response, error, loading, cancel, fetchData } = useAxiosHook();
  const [message, setMessage] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchData({
      method: "GET",
      url: url.posts.postsByAuthor(name),
    });

    return () => {
      clearInterval(fetchData);
      cancel();
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted && response.length > 0) {
      setPosts(response);
    } else {
      setMessage("This user has no posts yet");
    }

    return () => {
      mounted = false;
    }
  }, [response]);

  return (
    <>
      {loading && <PostSkeleton />}
      {error && <ErrorAlert />}
      {!loading && !error && <Posts posts={posts} />}
      {!loading && !error && !posts && <Typography>{message}</Typography>}
    </>
  );
}

export default UsersProfilePosts;