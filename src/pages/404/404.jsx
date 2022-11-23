import { Typography, Stack, IconButton } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Logo from "../../components/Logo";

const FourOFour = () => {

  const navigate = useNavigate();
  return (

    <Stack spacing={3} alignItems="center">
      <Logo />
      <Typography variant="h1" fontWeight="bold" component="h1">
        404
      </Typography>
      <Typography variant="h5" fontWeight="bold" component="h2">
        Page not found
      </Typography>
      <Typography variant="body1" color="textSecondary" component="p">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1" color="textSecondary" component="p">
            Go home
          </Typography>
          <IconButton onClick={() => navigate("/")}>
            <HomeOutlinedIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1" color="textSecondary" component="p">
            Or go back
          </Typography>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default FourOFour;