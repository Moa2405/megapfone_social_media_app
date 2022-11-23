import { Typography, Stack, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { formatDistance } from "../../../utils/formatData"

const PostAuthor = ({ author, created }) => {

  const [avatar, setAvatar] = useState(null)
  const postCreated = formatDistance(created);
  // author.avatar === "" || null ? setAvatar(false) : setAvatar(true);

  useEffect(() => {
    let mounted = true;

    if (mounted && author.avatar === "" || null) {
      setAvatar(false);
    } else {
      setAvatar(true);
    }

    return () => {
      mounted = false;
    }
  }, [author]);


  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {avatar && <Avatar src={author.avatar} />}
      <Typography fontWeight="bold">{author.name.replace("_", " ")}</Typography>
      <Typography color="textSecondary" variant="body2">{postCreated}</Typography>
    </Stack>
  );
}

export default PostAuthor;