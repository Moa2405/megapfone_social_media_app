import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useAuth } from "../../context/authContext";
import { useParams } from 'react-router-dom';
import url from "../../common/url";
import { useTheme } from "@mui/system";
import ProfileMedia from "../../components/profile/ProfileMedia";
import { useAxiosHook } from "../../hooks/useAxiosHook";
import UsersProfilePosts from "../../components/profile/UsersProfilesPosts";

const UsersProfile = () => {
  const { user, updateUser } = useAuth();
  const { name } = useParams();
  const { response, error, loading, cancel, fetchData } = useAxiosHook();
  const theme = useTheme();
  const [userProfile, setUserProfile] = useState([]);
  const [profileMedia, setProfileMedia] = useState([]);
  const api = url.profiles.profile(name);
  const mutedTextColor = theme.palette.mode === "dark" ? theme.palette.grey[500] : theme.palette.grey[600]

  // if (userProfile.name) {
  //   const isFollowing = user.following.find(following => following.name === userProfile.name);
  //   isFollowing ? setFollow(true) : setFollow(false);
  // }

  const handleFollow = () => {
    console.log(user.following);
  }

  useEffect(() => {
    fetchData({
      method: "GET",
      url: api,
    });

    return () => {
      clearInterval(fetchData);
      cancel();
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted && response.name) {
      setUserProfile(response);
      setProfileMedia({
        banner: response.banner,
        avatar: response.avatar
      });
    }

    return () => {
      mounted = false;
    }
  }, [response]);

  return (
    <>
      {userProfile.name === name && (
        <div>
          <ProfileMedia name={userProfile.name} media={profileMedia} />
          <Stack direction="row" px={2} alignItems="center" justifyContent="space-between">
            <Stack mt={6}>
              <Typography variant="h5" fontWeight="bold" component="h1">
                {userProfile.name.replaceAll("_", " ")}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Stack direction="row" alignItems="center" spacing="5px">
                  <Typography variant="body2" fontWeight="bold" component="p">
                    {userProfile._count.followers}
                  </Typography>
                  <Typography variant="body2" color={mutedTextColor} fontWeight="bold" component="p">
                    Followers
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing="5px">
                  <Typography variant="body2" fontWeight="bold" component="p">
                    {userProfile._count.following}
                  </Typography>
                  <Typography variant="body2" color={mutedTextColor} fontWeight="bold" component="p">
                    Following
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing="5px">
                  <Typography variant="body2" fontWeight="bold" component="p">
                    {userProfile._count.posts}
                  </Typography>
                  <Typography variant="body2" color={mutedTextColor} fontWeight="bold" component="p">
                    Posts
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>
      )}
      <UsersProfilePosts name={name} />
    </>
  );

}

export default UsersProfile;