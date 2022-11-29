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
  const { id } = useParams();
  console.log(response);

  useEffect(() => {
    let mounted = true;
    console.log("single post mounted");

    if (mounted) {

      fetchData({
        method: "GET",
        url: url.posts.getPost(id),
      });
    }

    return () => {
      console.log("single post Unmounted");
      mounted = false;
      clearInterval(fetchData);
      cancel();
    }
  }, []);

  if (loading) {
    return <PostSkeleton />
  }

  if (error) {
    return <ErrorAlert />
  }

  if (response.title) {
    return (
      <Stack width="100%" spacing={1}>
        <PostAuthor author={response.author} created={response.created} />
        <Typography color="primary" variant="h4" component="h1">{response.title}</Typography>
        <Tags tags={response.tags} />
        <Typography variant="body1">{response.body}</Typography>
        <PostMedia media={response.media} />
        <ReactToPost postId={response.id} reactions={response.reactions} />
        <CommentOnPost postId={response.id} />
        <Comments comments={response.comments} />
      </Stack>
    );
  }
}

export default SinglePost;