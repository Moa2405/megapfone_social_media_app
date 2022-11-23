import { Paper, Typography, Stack, Collapse } from "@mui/material";
import PostAuthor from "./PostAuthor";
import ReactToPost from "./ReactToPost";
import Comment from "./Comment";
import { Box } from "@mui/system";
import Tags from "./Tags";
import PostMedia from "./PostMedia";
import PostOptionBtn from "./PostOptionsBtn";
import { TransitionGroup } from 'react-transition-group';
import { Link } from "react-router-dom";
import ErrorAlert from "../../alert/ErrorAlert";

const Posts = ({ posts }) => {

  if (!posts) {
    return (
      <ErrorAlert />
    )
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TransitionGroup>
          {posts.map((post) => (
            <Collapse key={post.id}>
              <Paper
                elevation={2}
                component="article"
                sx={{
                  width: "100%",
                  pt: 2,
                  my: 2
                }}
              >
                <Stack width="100%" pb={1} px={2} direction="row" alignItems="center" justifyContent="space-between">
                  {/* Post author */}
                  <PostAuthor author={post.author} created={post.created} />
                  {/* Post options */}
                  {/* I need the posts state to the delete option */}
                  <PostOptionBtn post={post} />
                </Stack>
                <Stack spacing={1} width="100%" px={2} pb={1}>
                  {/* post title */}
                  <Link style={{ color: "inherit", textDecoration: "none" }} to={`/post/${post.id}`}>
                    <Stack spacing={1}>
                      <Typography noWrap={true} variant="h5" component="h2">
                        {post.title}
                      </Typography>
                      {/* post body */}
                      <Typography noWrap={true} variant="body1">
                        {post.body}
                      </Typography>
                    </Stack>
                  </Link>
                  {/* post tags */}
                  <Tags tags={post.tags} />
                </Stack>
                {/* post media */}
                <PostMedia media={post.media} />
                <ReactToPost postId={post.id} reactions={post.reactions} />
                <Comment postId={post.id} />
              </Paper>
            </Collapse>
          ))}
        </TransitionGroup>
      </Box>
    </>
  );
}

export default Posts;