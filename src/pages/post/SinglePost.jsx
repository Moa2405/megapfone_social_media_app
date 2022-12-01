import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "react-query";
import url from "../../common/url";
import ErrorAlert from "../../components/alert/ErrorAlert";
import PostAuthor from "../../components/post/singlePost/PostAuthor";
import PostMedia from "../../components/post/posts/PostMedia";
import ReactToPost from "../../components/post/posts/ReactToPost";
import PostSkeleton from "../../components/post/singlePost/PostSkeleton";
import CommentOnPost from "../../components/post/singlePost/CommentOnPost";
import Comments from "../../components/post/singlePost/Comments";
import { Typography, Stack } from "@mui/material";
import { useState } from "react";

const SinglePost = () => {

  const axios = useAxios();
  const { id } = useParams();
  const [comments, setComments] = useState(null);

  const fetchPost = async () => {
    const { data } = await axios.get(url.posts.getPost(id));
    return data;
  }

  const { data, isError, isLoading } = useQuery("singlePost", fetchPost, {
    onSuccess: (data) => {
      console.log(data);
      setComments(data.comments);
    },
  });

  const updateComments = (comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  const updateReplyOnComment = (reply) => {
    setComments((prev) => {
      const newComments = prev.map((comment) => {
        if (comment.id === reply.replyToId) {
          return {
            ...comment,
            replies: [reply, ...comment.replies],
          };
        }
        return comment;
      });
      return newComments;
    });
  };

  if (data) { console.log(data.comments); }

  if (isLoading) {
    return <PostSkeleton />
  }

  if (isError) {
    return <ErrorAlert />
  }

  return (
    <>
      <Stack width="100%" px={2} spacing={1}>
        <PostAuthor author={data.author} created={data.created} />
        <Typography color="primary" variant="h4" component="h1">{data.title}</Typography>
        <Typography variant="body1">{data.body}</Typography>
      </Stack>
      <PostMedia media={data.media} />
      <Stack width="100%" px={2} spacing={1}>
        <ReactToPost postId={data.id} reactions={data.reactions} />
        <CommentOnPost postId={data.id} handleCommentState={updateComments} />
        {comments && <Comments comments={comments} handleReplyState={updateReplyOnComment} />}
      </Stack>
    </>
  );
}

export default SinglePost;