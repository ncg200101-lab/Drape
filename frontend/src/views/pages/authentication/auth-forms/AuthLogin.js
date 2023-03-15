import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import { login } from 'actions/auth';
import DFnewLogger from 'utils/DFnewLogger';
import AnimateButton from 'ui-component/extended/AnimateButton';

const Google = GenS3Link('landing/images/icons/social-google');
const Facebook = GenS3Link('landing/images/icons/social-facebook');

const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const [checked, setChecked] = useState(true);
  const googleHandler = async () => {
    DFnewLogger('Sign in with Google...');
  };
  const facebookHandler = async () => {
    DFnewLogger('Sign in with Facebook...');
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
          password: Yup.string()
            .min(6)
            .max(255)
            .required('Password is required')
        })}
        onSubmit={async (values) => {
          dispatch(login(values, navigate));
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <Form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                Email Address
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  id="standard-weight-helper-text-email-login"
                  error
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="true"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {touched.password && errors.password && (
                <FormHelperText
                  id="standard-weight-helper-text-password-login"
                  error
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    style={{ color: '#232f3ed9' }}
                  />
                }
                label="Remember me"
              />
              <Link to="/forgot-pwd">
                <Typography
                  style={{ color: '#232f3e', textDecoration: 'underline' }}
                >
                  Forgot Password?
                </Typography>
              </Link>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  className="sign-btn"
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </Form>
        )}
      </Formik>
      <Grid item xs={12}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          <Button
            variant="outlined"
            sx={{
              cursor: 'unset',
              m: 2,
              py: 0.1,
              px: 7,
              borderColor: `${theme.palette.grey[300]} !important`,
              color: `${theme.palette.grey[900]} !important`
            }}
            disableRipple
            disabled
          >
            OR
          </Button>
          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
        </Box>
      </Grid>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              className="sign-google-btn"
              disableElevation
              fullWidth
              onClick={googleHandler}
              size="large"
              variant="outlined"
            >
              <Box
                sx={{
                  mr: { xs: 2, sm: 3, width: 20 },
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <DFnewImgTag
                  src={`${Google}.svg`}
                  fallback={`${Google}.svg`}
                  width="16"
                  height="16"
                  lzheight={20}
                  style={{ marginRight: matchDownMD ? 8 : 16 }}
                  alt="Sign in with Google"
                />
              </Box>
              Sign in with Google
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              className="sign-facebook-btn"
              disableElevation
              fullWidth
              onClick={facebookHandler}
              size="large"
              variant="outlined"
            >
              <Box
                sx={{
                  mr: { xs: 1, sm: 2, width: 20 },
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <DFnewImgTag
                  src={`${Facebook}.svg`}
                  fallback={`${Facebook}.svg`}
                  width="22"
                  height="22"
                  lzheight={24}
                  style={{ marginRight: matchDownMD ? 8 : 16 }}
                  alt="Sign in with Facebook"
                />
              </Box>
              Sign in with Facebook
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthLogin;
