import { Link } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import ReplyToComment from "./ReplayToComment";
import { formatDistance } from "../../../utils/formatData";
import { useTheme } from '@mui/system';
import { Box, Collapse, Divider, Paper, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const Comments = ({ comments, handleReplyState }) => {

  const [commentsState, setCommentsState] = useState(null);
  const theme = useTheme();
  const replyDividerColor = theme.palette.mode === "dark" ? "#FFFFFF" : "#000000";

  //making a new array of comments, adding an array of replies to each comment

  useEffect(() => {
    let mounted = true;
    if (mounted) {

      const commentsWithReply = comments.filter(comment => comment.replyToId === null);
      const replies = comments.filter(comment => comment.replyToId !== null);
      commentsWithReply.forEach(comment => {
        comment.replies = replies.filter(reply => reply.replyToId === comment.id);
      });

      setCommentsState(commentsWithReply);
    }
    return () => {
      mounted = false;
    }
  }, [comments]);

  if (comments.length === 0) {
    return (
      <Paper sx={{ p: 1 }} variant="body1">
        <Typography variant="body1">No comments yet</Typography>
      </Paper>
    )
  }

  return (
    <Stack spacing={3} sx={{ paddingTop: "50px" }}>
      <Typography variant="h5" component="h2">Comments</Typography>
      <TransitionGroup>
        {commentsState && commentsState.map(comment => (
          <Collapse key={comment.id} timeout={500}>
            <Paper elevation={1} sx={{ p: 1, mb: 3 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
                <Stack direction="column">
                  <Stack spacing={1} direction="row" alignItems="center">
                    <Link to={`/user/${comment.owner}`} style={{ textDecoration: "none" }}>
                      <Typography color="primary" variant="body2">{comment.owner.replace("_", " ")}</Typography>
                    </Link>
                    <Typography color="textSecondary" variant="body2">{formatDistance(comment.created)}</Typography>
                  </Stack>
                  <Box>
                    <Typography fontSize="1rem">
                      {comment.body}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
              <TransitionGroup>
                {comment.replies.map(reply => (
                  <Collapse key={reply.id}>
                    <Divider sx={{ my: 1, width: "30px", transform: "rotate(90deg)", borderBlockColor: replyDividerColor }} />
                    <Stack direction="column" sx={{ borderRadius: "0.25rem", p: 1 }}>
                      <Stack spacing={1} direction="row" alignItems="center">
                        <Link to={`/user/${reply.owner}`} style={{ textDecoration: "none" }}>
                          <Typography color="primary" variant="body2" fontWeight="bold" component="p">{reply.owner.replace("_", " ")}</Typography>
                        </Link>
                        <Typography color="textSecondary" variant="body2">{`Replied ${formatDistance(reply.created)}`}</Typography>
                      </Stack>
                      <Box>
                        <Typography fontSize="1rem">
                          {reply.body}
                        </Typography>
                      </Box>
                    </Stack>
                  </Collapse>
                ))}
              </TransitionGroup>
              <ReplyToComment postId={comment.postId} handleReplyState={handleReplyState} commentId={comment.id} />
            </Paper>
          </Collapse>
        ))}
      </TransitionGroup>
    </Stack>
  );
}

export default Comments;