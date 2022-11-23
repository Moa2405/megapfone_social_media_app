import { Box, Collapse, Divider, IconButton, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import ReplyIcon from '@mui/icons-material/Reply';
import ReplyToComment from "./ReplayToComment";
import { useState } from "react";
import { formatDistance } from "../../../utils/formatData";
import { useTheme } from '@mui/system';
import { TransitionGroup } from "react-transition-group";

const Comments = ({ comments }) => {

  const [reply, setReply] = useState(false);
  const theme = useTheme();

  const commentBackgroundColor = theme.palette.mode === "dark" ? "#1a1a1a" : theme.palette.grey[200];
  const replyBackgroundColor = theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[200];

  const commentsWithReply = comments.filter(comment => comment.replyToId === null);
  const replies = comments.filter(comment => comment.replyToId !== null);
  commentsWithReply.forEach(comment => {
    console.log(comment.created);
    comment.replies = replies.filter(reply => reply.replyToId === comment.id);
  });
  console.log(commentsWithReply);


  const handelReply = (e) => {
    setReply(true);
  }


  if (comments.length === 0) {
    return (
      <Paper sx={{ p: 1 }} variant="body1" component="p">
        <Typography variant="body1" component="p">No comments yet</Typography>
      </Paper>
    )
  }

  return (
    <Stack spacing={3} sx={{ paddingTop: "50px" }}>
      <Typography variant="h5" component="h2">Comments</Typography>
      <TransitionGroup>
        <Stack spacing={3}>
          {commentsWithReply.map(comment => (
            <Collapse key={comment.id} in={true} timeout={500}>
              <Paper elevation={2} sx={{ p: 1, }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ backgroundColor: commentBackgroundColor, borderRadius: "0.25rem", p: 2 }}>
                  <Stack direction="column">
                    <Stack spacing={1} direction="row" alignItems="center">
                      <Typography variant="body1" fontWeight="bold">{comment.owner.replace("_", " ")}</Typography>
                      <Typography color="textSecondary" variant="body2">{formatDistance(comment.created)}</Typography>
                    </Stack>
                    <Typography variant="body1" component="p">{comment.body}</Typography>
                  </Stack>
                  <IconButton onClick={(e) => handelReply(e)}>
                    <ReplyIcon />
                  </IconButton>
                </Stack>
                <TransitionGroup>
                  {comment.replies.map(reply => (
                    <Collapse key={reply.id}>
                      <div key={reply.id}>
                        <Divider sx={{ my: 1, width: "30px", transform: "rotate(90deg)", borderBlockEndWidth: "4px" }} />
                        <Stack direction="column" sx={{ backgroundColor: replyBackgroundColor, borderRadius: "0.25rem", p: 2 }}>
                          <Stack spacing={1} direction="row" alignItems="center">
                            <Typography variant="body2" fontWeight="bold" component="p">{reply.owner.replace("_", " ")}</Typography>
                            <Typography color="textSecondary" variant="body2">{`Replied ${formatDistance(reply.created)}`}</Typography>
                          </Stack>
                          <Typography variant="body1" component="p">{reply.body}</Typography>
                        </Stack>
                      </div>
                    </Collapse>
                  ))}
                </TransitionGroup>
                {reply && <ReplyToComment postId={comment.postId} commentId={comment.id} />}
              </Paper>
            </Collapse>
          ))}
        </Stack>
      </TransitionGroup>
    </Stack>
  );
}

export default Comments;