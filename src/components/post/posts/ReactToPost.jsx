import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { Chip, Grid, IconButton, Popper, Stack } from "@mui/material";
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined'
import useAxios from '../../../hooks/useAxios';
import url from '../../../common/url';
import { useTheme } from '@mui/system';

const ReactToPost = ({ postId, reactions }) => {

  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null);
  const [reactionsArray, setReactionsArray] = useState(reactions);
  const axios = useAxios();

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleReact = async (emojiObject, index) => {
    console.log(emojiObject);
    const res = await axios.put(url.posts.reactToPost(postId, emojiObject.symbol));
    if (res.status === 200) {
      const newReactionsArray = [...reactionsArray];
      newReactionsArray[index].count++;
      setReactionsArray(newReactionsArray);
    }
    console.log(reactionsArray);
  }

  const handleSelectedEmoji = async (emojiObject, event) => {
    console.log(emojiObject);

    setAnchorEl(anchorEl ? null : event.currentTarget);

    const res = await axios.put(url.posts.reactToPost(postId, emojiObject.emoji));
    console.log(res);

    if (res.status === 200) {

      const doseTheEmojiExists = reactionsArray.find(reaction => reaction.symbol === emojiObject.emoji);

      if (doseTheEmojiExists) {
        console.log('emoji exists');
        const index = reactionsArray.findIndex(reaction => reaction.symbol === emojiObject.emoji);
        const newReactionsArray = [...reactionsArray];
        newReactionsArray[index].count++;
        setReactionsArray(newReactionsArray);
      }
      else {
        console.log('emoji does not exist');
        setReactionsArray([...reactionsArray, res.data]);
      }
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'emoji-picker-popper' : undefined;

  return (
    <>
      <Popper sx={{ zIndex: "1000" }} id={id} open={open} anchorEl={anchorEl} placement="top-start">
        <EmojiPicker width={250} lazyLoadEmojis={true} onEmojiClick={handleSelectedEmoji} theme="dark" />
      </Popper>
      <Stack direction="row" alignItems="center" spacing={2} px={2} py={1}>
        <IconButton aria-label="React with emoji" onClick={handleClick}>
          <AddReactionOutlinedIcon
            fontSize="lg"
            sx={{ color: theme.palette.mode === "dark" ? theme.palette.grey[500] : theme.palette.grey[600] }}
          />
        </IconButton>
        <Grid container gap={1} direction="row" alignItems="center">
          {reactionsArray.length > 0 ? reactionsArray.map((reaction, index) => (
            <Chip
              key={index}
              size="small"
              variant="outlined"
              onClick={() =>
                handleReact(reaction, index)}
              label={reaction.symbol + " " + reaction.count}
              sx={{
                fontSize: "1em",
                color: theme.palette.mode === "dark" ? theme.palette.grey[500] : theme.palette.grey[600],
                BorderColor: theme.palette.mode === "dark" ? theme.palette.grey[500] : theme.palette.grey[600]
              }}
            />
          )) : ""}
        </Grid>
      </Stack>
    </>
  );
}

export default ReactToPost;