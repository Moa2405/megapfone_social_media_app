import { Stack } from "@mui/material";
import { useTheme } from "@mui/system";
import { Link } from "react-router-dom";

const Tags = ({ tags }) => {

  const theme = useTheme();
  const mainColor = theme.palette.primary.main;

  if (tags.length === 0) {
    return;
  }

  const tagsArray = tags.map((tag) => {
    if (tag.startsWith("#")) {
      tag = tag.replaceAll(" ", "");
      return tag;
    }
    return `#${tag.replaceAll(" ", "")}`
  })

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {tagsArray.map((tag, index) => (
        <Link key={index} to={`/posts?${tag}`} style={{ textDecoration: "none", color: mainColor, fontSize: "14px" }}>
          {tag}
        </Link>
      ))}
    </Stack>
  );
}

export default Tags;