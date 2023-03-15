import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Breadcrumbs,
  TextareaAutosize,
  useTheme
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';

import { strengthColor, strengthIndicator } from 'utils/PwdStrength';
import DFnewLogger from 'utils/DFnewLogger';
import {
  addBrand,
  editBrand,
  deleteBrand,
  getBrand,
  toggleBrandActive
} from 'actions/invBrand';

const CreateBrand = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [strengthPassword, setStrengthPassword] = useState(0);
  const [levelPassword, setLevelPassword] = useState();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrengthPassword(temp);
    setLevelPassword(strengthColor(temp));
  };
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [strengthConfirmPwd, setStrengthConfirmPwd] = useState(0);
  const [levelConfirmPwd, setLevelConfirmPwd] = useState();
  const handleClickShowConfirmPwd = () => {
    setShowConfirmPwd(!showConfirmPwd);
  };
  const handleMouseDownConfirmPwd = (event) => {
    event.preventDefault();
  };
  const changeConfirmPwd = (value) => {
    const temp = strengthIndicator(value);
    setStrengthConfirmPwd(temp);
    setLevelConfirmPwd(strengthColor(temp));
  };

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link disable">Brand</Typography>
            <Typography className="home-link current">
              Create Brand Staff
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Create Brand Staff</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPwd: '',
            address: '',
            brandName: ''
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().max(30).required('First Name is required'),
            lastName: Yup.string().max(30).required('Last Name is required'),
            brandName: Yup.string().max(30).required('Brand Name is required'),
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required'),
            password: Yup.string()
              .min(6)
              .max(255)
              .required('Password is required'),
            confirmPwd: Yup.string()
              .min(6)
              .max(255)
              .oneOf(
                [Yup.ref('password'), null],
                'Confirm password must be the same as Password'
              )
              .required('Confirm Password is required'),
            phone: Yup.string()
              .phone('Invalid Phone Number')
              .required('Phone Number is required')
          })}
          onSubmit={async (values) => {
            DFnewLogger(values);
            dispatch(addBrand(values));
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
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="#ff0000">
                    All (*) fields are mandatory
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.firstName && errors.firstName)}
                  >
                    <InputLabel>
                      First Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="First Name *"
                      value={values.firstName}
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.firstName && errors.firstName && (
                      <FormHelperText id="helper-text" error>
                        {errors.firstName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.lastName && errors.lastName)}
                  >
                    <InputLabel>
                      Last Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Last Name *"
                      value={values.lastName}
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.lastName && errors.lastName && (
                      <FormHelperText id="helper-text" error>
                        {errors.lastName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  >
                    <InputLabel>
                      Email <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Email *"
                      id="outlined-email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText id="helper-text" error>
                        {errors.email}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                  >
                    <InputLabel>
                      Phone <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Phone *"
                      value={values.phone}
                      type="number"
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.phone && errors.phone && (
                      <FormHelperText error>{errors.phone}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                  >
                    <InputLabel htmlFor="outlined-adornment-password-signup">
                      Password <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Password *"
                      id="outlined-adornment-password-signup"
                      autoComplete=""
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
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
                    />
                    {touched.password && errors.password && (
                      <FormHelperText
                        id="standard-weight-helper-text-password-signup"
                        error
                      >
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                  {strengthPassword !== 0 && (
                    <FormControl fullWidth>
                      <Box sx={{ mb: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item>
                            <Box
                              style={{ backgroundColor: levelPassword?.color }}
                              sx={{ width: 85, height: 8, borderRadius: '7px' }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" fontSize="0.75rem">
                              {levelPassword?.label}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </FormControl>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.confirmPwd && errors.confirmPwd)}
                  >
                    <InputLabel>
                      Confirm Password <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Confirm Password *"
                      id="confirm-password"
                      autoComplete=""
                      type={showConfirmPwd ? 'text' : 'password'}
                      value={values.confirmPwd}
                      name="confirmPwd"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changeConfirmPwd(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPwd}
                            onMouseDown={handleMouseDownConfirmPwd}
                            edge="end"
                            size="large"
                          >
                            {showConfirmPwd ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {touched.confirmPwd && errors.confirmPwd && (
                      <FormHelperText id="helper-confirm-password" error>
                        {errors.confirmPwd}
                      </FormHelperText>
                    )}
                  </FormControl>
                  {strengthConfirmPwd !== 0 && (
                    <FormControl fullWidth>
                      <Box sx={{ mb: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item>
                            <Box
                              style={{
                                backgroundColor: levelConfirmPwd?.color
                              }}
                              sx={{ width: 85, height: 8, borderRadius: '7px' }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" fontSize="0.75rem">
                              {levelConfirmPwd?.label}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </FormControl>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextareaAutosize
                      placeholder="Address"
                      style={{
                        minWidth: '100%',
                        maxWidth: '100%',
                        height: '100px',
                        minHeight: '80px',
                        padding: '1em',
                        borderColor: '#ccc',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.brandName && errors.brandName)}
                  >
                    <InputLabel>
                      Brand Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Brand Name *"
                      value={values.brandName}
                      name="brandName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.brandName && errors.brandName && (
                      <FormHelperText id="helper-text" error>
                        {errors.brandName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    className="admin-submit-btn"
                    disableElevation
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Create Brand
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
};

export default CreateBrand;
