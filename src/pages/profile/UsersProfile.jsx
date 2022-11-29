import { useEffect, useState } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
// import { useAuth } from "../../context/authContext";
import { useParams } from 'react-router-dom';
import url from "../../common/url";
import ProfileMedia from "../../components/profile/ProfileMedia";
import { useAxiosHook } from "../../hooks/useAxiosHook";
import UsersProfilePosts from "../../components/profile/UsersProfilesPosts";
import ErrorAlert from "../../components/alert/ErrorAlert";

const UsersProfile = () => {
  // const { user } = useAuth();
  const { name } = useParams();
  const { response, error, loading, cancel, fetchData } = useAxiosHook();
  console.log(name);

  const [userProfile, setUserProfile] = useState([]);
  const [profileMedia, setProfileMedia] = useState([]);
  const [nameOfUser, setNameOfUser] = useState(name);

  // const handleFollow = () => {
  //   console.log(user.following);
  // }

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchData({
        method: "GET",
        url: url.profiles.profile(name),
      });
      setNameOfUser(name)
    }

    return () => {
      mounted = false;
      cancel();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    let mounted = true;

    if (mounted && response.name) {
      setUserProfile(response);
      console.log(response);
      setProfileMedia({
        banner: response.banner,
        avatar: response.avatar
      });
    }

    return () => {
      mounted = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      {error && <ErrorAlert />}
      {loading && <CircularProgress />}
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
                  <Typography variant="body2" color="textSecondary" fontWeight="bold" component="p">
                    Followers
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing="5px">
                  <Typography variant="body2" fontWeight="bold" component="p">
                    {userProfile._count.following}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" fontWeight="bold" component="p">
                    Following
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing="5px">
                  <Typography variant="body2" fontWeight="bold" component="p">
                    {userProfile._count.posts}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" fontWeight="bold" component="p">
                    Posts
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>
      )}
      <Box mt={2}>
        <UsersProfilePosts name={nameOfUser} />
      </Box>
    </>
  );

}

export default UsersProfile;