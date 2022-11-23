import { useRef, useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useTheme } from '@mui/system';
import useAxios from "../../../hooks/useAxios";
import url from "../../../common/url";
import { LoadingButton } from "@mui/lab";

const Comment = ({ postId }) => {

  const theme = useTheme();
  const commentRef = useRef();
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  const handleOnChange = (e) => {
    setError(null);
    setErrorMessage(null);
    e.target.value.length > 0 ? setDisabled(false) : setDisabled(true);
  }

  const handleComment = async () => {
    const options = {
      body: commentRef.current.value
    }
    try {
      setLoading(true);
      const res = await axios.post(url.posts.comment(postId), options);
      if (res.status === 200) {
        commentRef.current.value = "";
      }
      console.log(res);
    }
    catch (error) {
      console.log(error);
      setError(`${error.response.data.errors[0].message}`);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
      >
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
            ),
          }}
          variant="filled"
          helperText={error}
        />
      </Box>
    </Box>
  );
}

export default Comment;