import { Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/system";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { stringAvatar } from "../../utils/avatarPlaceHolder";

const ProfileMedia = ({ media, name }) => {

  const [banner, setBanner] = useState();
  const [avatar, setAvatar] = useState();

  const theme = useTheme();

  const checkIfMediaIsImage = (media) => {
    if (media.banner) {
      const isImage = media.banner.match(/\.(jpeg|jpg|gif|png)$/);
      if (isImage) {
        setBanner(true);
      } else {
        setBanner(false);
      }
    }

    if (media.avatar) {
      const isImage = media.avatar.match(/\.(jpeg|jpg|gif|png)$/);
      if (isImage) {
        setAvatar(true);
      } else {
        setAvatar(false);
      }
    }
  }

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      checkIfMediaIsImage(media);
    }

    return () => {
      mounted = false
      clearInterval(checkIfMediaIsImage);
    };

  }, [media]);

  const backgroundColor = theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.23)" : theme.palette.grey[200];;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "200px",
          position: "relative"
        }}
      >
        {banner ? <img src={media.banner} alt="Profile banner" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
          : <Box sx={{ bgcolor: backgroundColor, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AddPhotoAlternateOutlinedIcon fontSize="large" />
          </Box>
        }

        <div style={{ position: "absolute", bottom: "-30px", left: "30px", width: "20%", aspectRatio: "1/1" }}>
          {avatar
            ? <Avatar alt="profile" src={media.avatar} sx={{ width: "100%", height: "100%" }} />
            : <Avatar {...stringAvatar(name)} sx={{ width: "100%", height: "100%", fontSize: "34px", fontWeight: "bold" }} />
          }
        </div>
      </Box>
    </>
  );
}

export default ProfileMedia;