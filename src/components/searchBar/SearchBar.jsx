import { TextField, InputAdornment, Modal, Paper, IconButton, Typography, Stack, Button, Box, Avatar, CircularProgress, Hidden } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from "@mui/system";
import { useAxiosHook } from "../../hooks/useAxiosHook";
import url from "../../common/url";
import { useEffect, useState, useRef } from "react";
import { stringAvatar } from "../../utils/avatarPlaceHolder";
import { Link } from "react-router-dom";
import ErrorAlert from "../alert/ErrorAlert";

const SearchBar = () => {

  const { response, loading, error, fetchData } = useAxiosHook();
  const [openModal, setOpenModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef();

  const handleOpenSearchModal = () => {
    setOpenModal(true);

    if (!response.length > 0) {
      console.log(response);

      fetchData({
        method: "get",
        url: url.profiles.profiles
      })
    }
  };

  const handleCloseSearchModal = () => {
    setSearchResults([]);
    setOpenModal(false);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted && response.length > 0)
      setSearchResults(response);

    return () => {
      isMounted = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const theme = useTheme();
  const searchIconColor = theme.palette.text.disabled;

  const style = {
    position: 'absolute',
    maxHeight: "80%",
    overflow: "hidden",
    top: "10%",
    left: '50%',
    transform: 'translate(-50%, 0%)',
    borderRadius: "10px",
    border: "2px solid",
    borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[500],
    padding: "1rem",
    width: "100%",
    maxWidth: "500px",
  };

  const handleKeyPress = () => {
    if (searchRef.current.value.length === 0) {
      setSearchResults([]);
    } else {
      const searchProfiles = response.filter((user) => {
        return user.name.toLowerCase().includes(searchRef.current.value.toLowerCase());
      })
      setSearchResults(searchProfiles);
    }
  }

  return (
    <>
      <Hidden mdUp>
        <IconButton onClick={handleOpenSearchModal}>
          <SearchIcon color="action" />
        </IconButton>
      </Hidden>
      <Hidden mdDown>
        <Button variant="outlined" sx={{ cursor: "pointer", borderColor: searchIconColor }} onClick={handleOpenSearchModal}>
          <Stack width="100%" direction="row">
            <SearchIcon sx={{ color: searchIconColor }} />
          </Stack>
        </Button>
      </Hidden>
      <Modal
        open={openModal}
        onClose={handleCloseSearchModal}
        aria-labelledby="Search"
        aria-describedby="Search"
      >
        <Paper elevation={1} sx={style}>
          {error && <ErrorAlert />}
          {loading && <CircularProgress />}
          {response.length > 0 && <Stack spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
              <IconButton fontSize="large" onClick={handleCloseSearchModal}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h5">
                Search profiles
              </Typography>
              <Box>

              </Box>
            </Stack>
            <Stack
              direction="column"
              spacing={3}
              // component="form"
              // noValidate
              sx={{ margin: "0px" }}
              autoComplete="off"
            >
              <TextField
                inputRef={searchRef}
                sx={{ borderColor: searchIconColor }}
                onChange={handleKeyPress}
                size="small"
                variant="outlined"
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: searchIconColor }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Stack spacing={2} sx={{ overflowY: "scroll", maxHeight: "600px" }}>
                {searchResults.map((user) => (
                  <Link key={user.name} to={`/user/${user.name}`} onClick={handleCloseSearchModal} style={{ textDecoration: "none", color: "inherit" }}>
                    <Stack key={user.name} direction="row" alignItems="center" spacing={2}>
                      {user.avatar === null || user.avatar === "" ? <Avatar {...stringAvatar(user.name)} /> : <Avatar src={user.avatar} />}
                      <Typography variant="body1">
                        {user.name}
                      </Typography>
                    </Stack>
                  </Link>
                )
                )}
              </Stack>
            </Stack>
          </Stack>}
        </Paper>
      </Modal>
    </>
  );
}

export default SearchBar;

//q: git push -u origin master


