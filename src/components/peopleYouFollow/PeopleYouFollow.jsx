import { Avatar, Paper, Typography, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { stringAvatar } from "../../utils/avatarPlaceHolder";

const PeopleYouFollow = () => {

  const { user } = useAuth();

  if (user.following.length === 0) {
    return (
      <Box>
        <Typography >
          You are not following anyone yet
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Paper width="100%" sx={{ p: 2, mb: 2 }}>
        <Stack spacing={3}>
          <Typography color="textSecondary">
            People you follow
          </Typography>
          <Stack spacing={2}>
            {user.following.map((user, index) => (
              <Link key={index} to={`/user/${user.name}`} style={{ textDecoration: "none", color: "inherit" }}>
                {/* <Paper elevation={2} sx={{ p: 1 }}> */}
                <Stack direction="row" spacing={3} alignItems="center">
                  {user.avatar === null || user.avatar === "" ?
                    <Avatar {...stringAvatar} sx={{ height: 35, width: 35 }} /> : <Avatar src={user.avatar} sx={{ height: 35, width: 35 }} />}
                  <Typography>
                    {user.name}
                  </Typography>
                </Stack>
                {/* </Paper> */}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </>
  );



  // useEffect(() => {
  //   let mounted = true;
  //   console.log("people you follow mounted");

  //   if (mounted) {
  //     fetchData({
  //       method: "GET",
  //       url: url.peopleYouFollow,
  //     });
  //   }

  //   return () => {
  //     console.log("people you follow unmounted");
  //     mounted = false;
  //     clearInterval(fetchData);
  //     // cancel();
  //   }
  // }, []);

}

export default PeopleYouFollow;