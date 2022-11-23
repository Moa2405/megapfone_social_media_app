import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxiosHook } from "../../hooks/useAxiosHook";
import url from "../../common/url";
import ErrorAlert from "../../components/alert/ErrorAlert";
import { Stack } from "@mui/system";
import PostAuthor from "../../components/post/singlePost/PostAuthor";
import PostMedia from "../../components/post/posts/PostMedia";
import Tags from "../../components/post/posts/Tags";
import ReactToPost from "../../components/post/posts/ReactToPost";
import PostSkeleton from "../../components/post/singlePost/PostSkeleton";
import CommentOnPost from "../../components/post/singlePost/CommentOnPost";
import Comments from "../../components/post/singlePost/Comments";

const SinglePost = () => {

  const { loading, response, error, cancel, fetchData } = useAxiosHook();
  const [post, setPost] = useState(null);
  const { id } = useParams();
  console.log(post);

  useEffect(() => {
    fetchData({
      method: "GET",
      url: url.posts.getPost(id),
    });

    return () => {
      clearInterval(fetchData);
      cancel();
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted && response.created) {

      setPost(response);
    }

    return () => {
      mounted = false;
    }
  }, [response]);

  return (
    <>
      {loading && <PostSkeleton />}
      {error && <ErrorAlert />}
      {post && (
        <Stack width="100%" spacing={1}>
          <PostAuthor author={post.author} created={post.created} />
          <Typography color="primary" variant="h4" component="h1">{post.title}</Typography>
          <Tags tags={post.tags} />
          <Typography noWrap={true} variant="body1" component="p">{post.body}</Typography>
          <PostMedia media={post.media} />
          <ReactToPost postId={post.id} reactions={post.reactions} />
          <CommentOnPost postId={post.id} />
          <Comments comments={post.comments} />
        </Stack>
      )}
    </>
  );
}

export default SinglePost;