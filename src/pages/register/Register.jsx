import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAxiosHook } from "../../hooks/useAxiosHook";
import { Box, TextField, Alert, Typography, Divider, Stack } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import url from '../../common/url';
import { Link } from "react-router-dom";
import { useTheme } from "@mui/system";
import Logo from "../../components/Logo"

const schema = yup.object().shape({
  name: yup.string().required("This field is required").matches(/^[a-zA-Z0-9_ ]+$/, "The name value must not contain punctuation symbols apart from underscore (_)"),
  email: yup.string().required("This field is required").matches(/stud.noroff.no$|noroff.no/, "Must be a @stud.noroff.no or @noroff.no email").email("Must be a valid email"),
  password: yup.string().required("This field is required").min(8).max(20),
});

const Register = () => {

  const { response, error, loading, fetchData } = useAxiosHook();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const redirect = useNavigate();
  const theme = useTheme();

  const onSubmit = async (data) => {
    fetchData({
      method: "post",
      url: url.auth.register,
      data,
    });
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted && response.name) {
      redirect("/signIn");
    }

    return () => {
      isMounted = false;
    }
  }, [response, redirect]);

  const errContrastText = theme.palette.mode === "dark" ? theme.palette.error.contrastText : theme.palette.error.main;

  return (
    <Box
      width="100%"
      maxWidth="400px"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Stack spacing={3} justifyContent="center" width="100%">
        <Logo />
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Name*"
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email*"
              variant="outlined"
              size="small"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Password*"
              variant="outlined"
              type="password"
              size="small"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <LoadingButton type="submit" loading={loading} variant="contained" color="primary">
          Register
        </LoadingButton>
        {error && error[0].message === "Profile already exists" && (
          <Alert severity="error">
            <Stack direction="row" spacing={2}>
              <Typography variant="body2" color={errContrastText}>
                {error[0].message}
              </Typography>
              <Link to="/signIn">
                <Typography variant="body2" color={errContrastText}>
                  Sign in
                </Typography>
              </Link>
            </Stack>
          </Alert>)
        }
        <Divider>Or</Divider>
        <Stack direction="row" justifyContent="center" spacing={1}>
          <Typography variant="body2">
            Already have an account?
          </Typography>
          <Link to="/signIn" style={{ color: theme.palette.primary.main, textDecoration: "none" }}>
            <Typography variant="body2">
              Sign in here
            </Typography>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Register;