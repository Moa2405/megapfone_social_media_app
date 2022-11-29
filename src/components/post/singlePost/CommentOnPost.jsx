import { useEffect, useRef, useState } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import url from "../../../common/url";
import { LoadingButton } from "@mui/lab";
import { useAxiosHook } from "../../../hooks/useAxiosHook";
import { useSnackBar } from "../../../context/snackBarContext";

const CommentOnPost = ({ postId }) => {

  const { activateSnackBar } = useSnackBar();
  const { response, loading, error, fetchData } = useAxiosHook();
  const commentRef = useRef();
  const [disabled, setDisabled] = useState(true);

  const handleOnChange = (e) => {
    e.target.value.length > 0 ? setDisabled(false) : setDisabled(true);
  }

  const handleComment = async () => {
    const options = {
      body: commentRef.current.value
    }

    fetchData({
      method: "post",
      url: url.posts.comment(postId),
      data: options
    })
  }

  useEffect(() => {
    let mounted = true;

    if (mounted && response.created) {
      commentRef.current.value = "";
      setDisabled(true);
      activateSnackBar("Comment added successfully", "success");
    }

    return () => mounted = false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

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
                  loading={loading}
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
          helperText={error}
        />
      </Box>
    </Box>
  );
}

export default CommentOnPost;