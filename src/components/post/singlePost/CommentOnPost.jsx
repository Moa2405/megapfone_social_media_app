import { useRef, useState } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import url from "../../../common/url";
import { LoadingButton } from "@mui/lab";
import { useSnackBar } from "../../../context/snackBarContext";
import useAxios from "../../../hooks/useAxios";
import { useMutation } from 'react-query';

const CommentOnPost = ({ postId, handleCommentState }) => {

  const { activateSnackBar } = useSnackBar();
  const commentRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const axios = useAxios();

  const postComment = async () => {
    const { data } = await axios.post(url.posts.comment(postId), { body: commentRef.current.value });
    return data;
  }

  const { isLoading, mutate } = useMutation(postComment, {
    onSuccess: (data) => {
      handleCommentState(data);
      commentRef.current.value = "";
      console.log(data);
      setDisabled(true);
      activateSnackBar("Comment added successfully", "success");
    },
    onError: () => {
      activateSnackBar("Something went wrong", "error");
    }
  });

  const handleOnChange = (e) => {
    e.target.value.length > 0 ? setDisabled(false) : setDisabled(true);
  }

  const handleComment = () => {
    mutate();
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <TextField
          id="input-with-icon-textfield"
          label="Comment..."
          multiline
          fullWidth
          size="small"
          inputRef={commentRef}
          defaultValue=""
          onChange={(e) => { handleOnChange(e) }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <LoadingButton
                  loading={isLoading}
                  disabled={disabled}
                  onClick={handleComment}
                  sx={{ marginBottom: "16px" }}
                  variant="text"
                >
                  Post
                </LoadingButton>
              </InputAdornment>
            )
          }}
          variant="filled"
        />
      </Box>
    </Box>
  );
}

export default CommentOnPost;