import { CircularProgress, ListItemIcon, MenuItem, Stack, Typography } from "@mui/material";
import { useAxiosHook } from "../../hooks/useAxiosHook";
import { useAuth } from "../../context/authContext";
import ErrorIcon from '@mui/icons-material/Error';
import url from "../../common/url";
import { useEffect } from "react";
import { useSnackBar } from "../../context/snackBarContext";


const UnFollow = ({ post, setFollows, closeMenu }) => {

  const { user, updateUser } = useAuth();
  const { response, error, loading, fetchData } = useAxiosHook();
  const { activateSnackBar } = useSnackBar();

  useEffect(() => {
    let mounted = true;
    if (mounted && response.name) {
      //update the user object in context
      const updatedUser = { ...user, following: user.following.filter(following => following.name !== post.author.name) };
      updateUser(updatedUser);
      //this is a function that updates the state of the parent component
      setFollows("notFollowing");
      closeMenu();
      activateSnackBar("You stopped following " + post.author.name, "success");
    }
    if (error) {
      activateSnackBar("Some thing went wrong", "error");
    }

    return () => mounted = false;
  }, [response]);

  const handleUnFollow = async () => {
    fetchData({
      method: "PUT",
      url: url.profiles.unFollow(post.author.name),
    });
  };

  return (
    <MenuItem onClick={handleUnFollow}>
      <ListItemIcon>
        {error && <ErrorIcon />}
        {loading && <CircularProgress size={20} />}
        <Typography variant="body1" component="p">Unfollow</Typography>
        {error && <Typography variant="body1" color="error" component="p">Some thing went wrong</Typography>}
      </ListItemIcon>
    </MenuItem>
  );
}

export default UnFollow;