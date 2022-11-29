import { useEffect, useRef, useState } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { useTheme } from '@mui/system';
import { useAxiosHook } from "../../../hooks/useAxiosHook";
import url from "../../../common/url";
import { LoadingButton } from "@mui/lab";

const ReplyToComment = ({ postId, commentId }) => {

  const theme = useTheme();
  const commentRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const { response, loading, error, fetchData } = useAxiosHook();

  const handleOnChange = (e) => {
    e.target.value.length > 0 ? setDisabled(false) : setDisabled(true);
  }

  const handleComment = () => {
    const options = {
      body: commentRef.current.value,
      replyToId: commentId
    }

    fetchData({
      method: "post",
      url: url.posts.comment(postId),
      data: options
    })
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted && response.body) {
      console.log(response);
    }

    return () => {
      isMounted = false;
    }
  }, [response])

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
                  loading={loading}
                  disabled={disabled}
                  onClick={handleComment}
                  sx={{ marginBottom: "16px" }}
                  variant="text"
                >
                  Post
                </LoadingButton>
              </InputAdornment>
            ),
          }}
          variant="filled"
          helperText={error}
        />
      </Box>
    </Box>
  );
}

export default ReplyToComment;