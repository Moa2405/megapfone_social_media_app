import { useState } from "react";
import { useQuery } from "react-query";
import useAxios from "../../hooks/useAxios";
import { Box, Stack, Typography } from "@mui/material";
import { useAuth } from "../../context/authContext";
import url from "../../common/url";
import { useTheme } from "@mui/system";
import EditProfile from "../../components/profile/editProfile";
import Posts from "../../components/post/posts/Posts";
import ProfileMedia from "../../components/profile/ProfileMedia";
import ErrorAlert from "../../components/alert/ErrorAlert";
import PostSkeleton from "../../components/post/posts/PostsSkeletons";
import { usePostsContext } from "../../context/postContext";

const MeProfile = () => {

  const axios = useAxios();
  const { postsInContext, setInitialPosts } = usePostsContext()
  const { user } = useAuth();
  const theme = useTheme();
  const [profileImages, setProfileImages] = useState({
    banner: user.banner,
    avatar: user.avatar,
  });
  const urlApi = url.posts.postsByAuthor(user.name);

  const fetchProfile = async () => {
    const { data } = await axios.get(urlApi);
    return data;
  }

  const { data, isError, isLoading } = useQuery("myProfile", fetchProfile, {
    onSuccess: (data) => {
      setInitialPosts(data)
    },
  });

  const mutedTextColor = theme.palette.mode === "dark" ? theme.palette.grey[500] : theme.palette.grey[600]
  const userName = user.name.replaceAll("_", " ");

  return (
    <>
      {/* banner and avatar */}
      <ProfileMedia name={user.name} media={profileImages} />
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack mt={6}>
            <Typography variant="h5" fontWeight="bold" component="h1">
              {userName}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Stack direction="row" alignItems="center" spacing="5px">
                <Typography variant="body2" fontWeight="bold" component="p">
                  {user.followers.length}
                </Typography>
                <Typography variant="body2" color={mutedTextColor} fontWeight="bold" component="p">
                  Followers
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing="5px">
                <Typography variant="body2" fontWeight="bold" component="p">
                  {user.following.length}
                </Typography>
                <Typography variant="body2" color={mutedTextColor} fontWeight="bold" component="p">
                  Following
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <EditProfile setProfileImages={setProfileImages} />
        </Stack>
        <Box sx={{ mt: 4 }}>
          {isLoading && <PostSkeleton />}
          {isError && <ErrorAlert />}
          {data && <Posts posts={postsInContext} />}
        </Box>
      </Box>
    </>
  );

}

export default MeProfile;