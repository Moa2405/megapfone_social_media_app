import { CircularProgress, ListItemIcon, MenuItem, Stack, Typography } from "@mui/material"
import { useAxiosHook } from "../../hooks/useAxiosHook";
import { useAuth } from "../../context/authContext";
import ErrorIcon from '@mui/icons-material/Error';
import url from "../../common/url";
import { useEffect } from "react";
import { useSnackBar } from "../../context/snackBarContext";

const Follow = ({ post, setFollows, closeMenu }) => {

  const { user, updateUser } = useAuth();
  const { response, error, loading, fetchData } = useAxiosHook();
  const { activateSnackBar } = useSnackBar();

  const handleFollow = () => {

    fetchData({
      method: "PUT",
      url: url.profiles.follow(post.author.name),
    });
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && response.name) {

      //updating the user object in context
      const updatedUser = { ...user, following: [...user.following, { name: post.author.name, avatar: post.author.avatar }] };
      updateUser(updatedUser);

      //this is a function that updates the state of the parent component
      setFollows("following");
      closeMenu();
      activateSnackBar("You are now following " + post.author.name, "success");
    }
    if (error) {
      activateSnackBar("Some thing went wrong", "error");
    }

    return () => mounted = false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <MenuItem onClick={handleFollow}>
      <ListItemIcon>
        <Stack spacing={2} direction="row">
          {error && <ErrorIcon color="error" />}
          {loading && <CircularProgress size={20} />}
          <Stack spacing={1}>
            <Typography variant="body1" component="p">Follow</Typography>
            {error && <Typography variant="body1" color="error" component="p">Some thing went wrong</Typography>}
          </Stack>
        </Stack>
      </ListItemIcon>
    </MenuItem>
  );
}

export default Follow;