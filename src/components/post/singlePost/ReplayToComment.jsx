import { useRef, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useMutation } from 'react-query';
import { useSnackBar } from "../../../context/snackBarContext";
import url from "../../../common/url";
import { Box, InputAdornment, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ReplyToComment = ({ postId, commentId, handleReplyState }) => {

  const { activateSnackBar } = useSnackBar();
  const commentRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const axios = useAxios();

  const postComment = async (data) => {
    const response = await axios.post(url.posts.comment(postId), data)
    return response;
  }

  const { isLoading, mutate } = useMutation(postComment, {
    onSuccess: (data) => {
      handleReplyState(data);
      activateSnackBar("Reply posted successfully", "success");
      console.log(data);
      commentRef.current.value = "";
      setDisabled(true);
    },
    onError: () => {
      activateSnackBar("Something went wrong", "error");
    }
  });

  const handleOnChange = (e) => {
    e.target.value.length > 0 ? setDisabled(false) : setDisabled(true);
  }

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box>
        <TextField
          id="input-with-icon-textfield"
          label="Reply..."
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
                  onClick={() => {
                    mutate({ body: commentRef.current.value, replyToId: commentId })
                  }}
                  sx={{ marginBottom: "16px" }}
                  variant="text"
                >
                  Post
                </LoadingButton>
              </InputAdornment>
            ),
          }}
          variant="filled"
        />
      </Box>
    </Box>
  );
}

export default ReplyToComment;