const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

//replacing underscores with spaces on author name


export const stringAvatar = (name) => {

  const AuthorName = name.replaceAll("_", " ");

  //to use on avatar
  const AuthorNameAvatar = AuthorName.toUpperCase()

  //checking if author name has more than one word and if so 
  //only taking the first letter of each word and displaying it in the avatar,
  //the function fires only if avatar image is null
  if (AuthorName.split(" ").length === 1) {
    return {
      sx: {
        bgcolor: stringToColor(AuthorName),
      },
      children: `${AuthorName.split(' ')[0][0]}`,
    };
  }

  if (AuthorName.split(" ").length === 2) {
    return {
      sx: {
        bgcolor: stringToColor(AuthorName),
      },
      children: `${AuthorName.split(' ')[0][0]}${AuthorName.split(' ')[1][0]}`,
    };
  }

  if (AuthorName.split(" ").length === 3) {
    console.log("name is two word");
    return {
      sx: {
        bgcolor: stringToColor(AuthorName),
      },
      children: `${AuthorName.split(' ')[0][0]}${AuthorName.split(' ')[1][0]}${AuthorName.split(' ')[2][0]}`,
    };
  }
}