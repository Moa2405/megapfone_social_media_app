import { useState, useRef, useEffect } from "react";
import url from "../../common/url";
import { useAxiosHook } from "../../hooks/useAxiosHook";
import { useAuth } from "../../context/authContext";
import { useTheme } from "@emotion/react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackBar } from "../../context/snackBarContext";
import {
  Box,
  Modal,
  Button,
  TextField,
  Typography,
  IconButton,
  Stack,
  InputAdornment,
  Divider,
  Avatar,
  Alert,
  Paper
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from "@mui/lab";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ErrorAlert from "../alert/ErrorAlert";
import { PropaneTankSharp } from "@mui/icons-material";

const schema = yup.object().shape({
  banner: yup.string().url("Must be a valid url").matches(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i, "Must be a valid image url"),
  avatar: yup.string().url("Must be a valid url").matches(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i, "Must be a valid image url"),
});

const EditProfile = ({ setProfileImages }) => {

  const { user, updateUser } = useAuth();
  const theme = useTheme();
  const { activateSnackBar } = useSnackBar();
  const [openModal, setOpenModal] = useState(false);
  const [snackBar, setSnackBar] = useState({
    severity: "success",
    message: "Profile updated successfully",
    open: false
  });

  const [previewBannerImg, setPreviewBannerImg] = useState(user.banner);
  const [previewAvatarImg, setPreviewAvatarImg] = useState(user.avatar);
  const [disabledPreviewBannerBtn, setDisabledPreviewBannerBtn] = useState(false);
  const [disabledPreviewAvatarBtn, setDisabledPreviewAvatarBtn] = useState(false);
  const { response, error, loading, cancel, fetchData } = useAxiosHook();

  const { control, handleSubmit, watch, trigger, formState: { errors } } = useForm({
    defaultValues: {
      banner: user.banner,
      avatar: user.avatar
    },
    resolver: yupResolver(schema)
  });

  const handleDisableBannerBtn = async () => {
    const result = await trigger("banner");
    setDisabledPreviewBannerBtn(result);
  }

  const handleDisableAvatarBtn = async () => {
    const result = await trigger("avatar");
    setDisabledPreviewAvatarBtn(result);
  }

  const handlePreviewBannerImg = () => {
    setPreviewBannerImg(watch("banner"));
  }
  const handlePreviewAvatarImg = () => {
    setPreviewAvatarImg(watch("avatar"));
  }

  const handleUpdateProfile = async (data) => {
    console.log(data);

    fetchData({
      method: "PUT",
      url: url.profiles.UpdateProfileMedia(user.name),
      data: data
    });
  }

  useEffect(() => {
    let mounted = true;

    if (mounted && response.name) {
      const newUserObject = { ...user }
      console.log(newUserObject);
      newUserObject.banner = response.banner;
      newUserObject.avatar = response.avatar;
      updateUser(newUserObject);
      console.log(user);
      setProfileImages({ banner: response.banner, avatar: response.avatar });
      handleCloseEditProfileModal();
      activateSnackBar("Profile updated successfully", "success");
    }

    return () => mounted = false;
  }, [response]);

  const handleOpenEditProfileModal = () => setOpenModal(true);
  const handleCloseEditProfileModal = () => setOpenModal(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: "10px",
    border: "2px solid",
    borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[500],
    p: 3,
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpenEditProfileModal}>Edit profile</Button>
      <Modal
        open={openModal}
        onClose={handleCloseEditProfileModal}
        aria-labelledby="Edit-profile"
        aria-describedby="Edit profile image and banner image"
      >
        <Paper sx={style}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" width="65%">
              <IconButton fontSize="large" onClick={handleCloseEditProfileModal}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h6">
                Edit Profile
              </Typography>
            </Stack>
            <Stack
              direction="column"
              spacing={2}
              component="form"
              noValidate
              autoComplete="off"
              sx={{ margin: "0px" }}
            >
              {/* mui textfield for banner */}
              <Stack spacing={2} direction="column" width="100%">
                <img src={previewBannerImg} alt="preview" style={{ objectFit: "cover" }} height="100px" width="100%" />
                <Controller
                  name="banner"
                  control={control}
                  defaultValue={user.banner}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleDisableBannerBtn(e);
                      }}
                      label="Banner url"
                      fullWidth
                      size="small"
                      variant="outlined"
                      type="text"
                      margin="normal"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <ImageOutlinedIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      error={!!errors.banner}
                      helperText={errors.banner?.message}
                    />
                  )}
                />
                <div>
                  <Button
                    disabled={!disabledPreviewBannerBtn}
                    onClick={handlePreviewBannerImg}
                    size="small"
                    variant="outlined"
                  >
                    Preview
                  </Button>
                </div>
              </Stack>
              <Divider />
              {/* mui textfield for avatar */}
              <Stack spacing={2} direction="column" width="100%">
                <Avatar src={previewAvatarImg} alt={user.name} sx={{ width: 100, height: 100 }} />
                <Controller
                  name="avatar"
                  control={control}
                  defaultValue={user.avatar}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Avatar url"
                      size="small"
                      onChange={(e) => {
                        field.onChange(e);
                        handleDisableAvatarBtn(e);
                      }}
                      variant="outlined"
                      type="text"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <ImageOutlinedIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      error={!!errors.avatar}
                      helperText={errors.avatar?.message}
                    />
                  )}
                />
                <div>
                  <Button
                    disabled={!disabledPreviewAvatarBtn}
                    onClick={handlePreviewAvatarImg}
                    size="small"
                    variant="outlined"
                  >
                    Preview
                  </Button>
                </div>
              </Stack>
              <LoadingButton
                onClick={handleSubmit(handleUpdateProfile)}
                variant="contained"
                color="primary"
                loading={loading}
              >
                Edit profile
              </LoadingButton>
              {error && <ErrorAlert />}
            </Stack>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
}

export default EditProfile;