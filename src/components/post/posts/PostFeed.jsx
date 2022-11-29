import { useEffect } from "react";
import url from "../../../common/url";
import { useAxiosHook } from "../../../hooks/useAxiosHook";
import ErrorAlert from "../../alert/ErrorAlert";
import Posts from "./Posts";
import PostSkeleton from "./PostsSkeletons";

const PostFeed = () => {

  const { response, error, loading, cancel, fetchData } = useAxiosHook();

  const apiUrl = url.posts.allPostsLimitFifty;

  useEffect(() => {
    let mounted = true;
    console.log("post feed mounted");

    if (mounted) {
      fetchData({
        method: "GET",
        url: apiUrl,
      });
    }

    return () => {
      console.log("post feed unmounted");
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

  return (
    <>
      <Posts posts={response} />
    </>
  );

}

export default PostFeed

