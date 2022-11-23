import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useAxiosHook } from "../../hooks/useAxiosHook";

const FollowOnProfilePage = () => {

  const { user, updateUser } = useAuth();
  const { response, error, loading, fetchData } = useAxiosHook();
  const [follows, setFollow] = useState(null);

  const isFollowing = user.following.find(following => following.name === post.author.name);
  isFollowing ? setFollow(true) : setFollow(false);

  useEffect(() => {
    let mounted = true;
    if (mounted && response.name) {
      //update the user object in context
      const updatedUser = { ...user, following: [...user.following, { name: post.author.name, avatar: post.author.avatar }] };
      updateUser(updatedUser);
      activateSnackBar("You are now following " + post.author.name, "success");
    }
    if (error) {
      activateSnackBar("Some thing went wrong", "error");
    }

    return () => mounted = false;
  }, [response]);

  const handleFollow = () => {
    fetchData({
      method: "PUT",
      url: url.profiles.follow(post.author.name),
    });
  };

  return (
    <LoadingButton loading={loading} onClick={handleFollow} variant="outlined" color="primary">
      {follows ? "Un Follow" : "Follow"}
    </LoadingButton>
  );
}

export default FollowOnProfilePage;