import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme
} from '@mui/material';
import { Modal } from 'antd';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

//-- component
import DFnewLogger from 'utils/DFnewLogger';
//-- action
import { editLoginDetails } from 'actions/auth';

const Login = () => {
  //-- hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  //-- params
  const initVal = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    currentPwd: '',
    newPwd: '',
    confirmPwd: ''
  };

  return (
    <Box className="overview">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className="overview-sup-title">LOGIN DETAILS</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ borderColor: '#ff6c00' }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className="overview-title">Full Name</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className="overview-content">
            {user?.firstName} {user?.lastName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className="overview-title">Email</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className="overview-content">{user?.email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className="overview-title">Password</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className="overview-content">********</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} className="h-align-right">
          <Button className="account-yes-btn" onClick={() => showModal(true)}>
            EDIT
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={open}
        title="Change Login Details"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Formik
          initialValues={initVal}
          enableReinitialize
          validationSchema={Yup.object().shape({
            firstName: Yup.string()
              .min(1)
              .max(20)
              .required('Please input your FirstName'),
            lastName: Yup.string()
              .min(1)
              .max(20)
              .required('Please input your LastName'),
            email: Yup.string()
              .email('Must be a valid email')
              .min(1)
              .max(255)
              .required('Please input your Email'),
            currentPwd: Yup.string().min(6).max(255).notRequired(),
            newPwd: Yup.string().min(6).max(255).notRequired(),
            confirmPwd: Yup.string().min(6).max(255).notRequired()
          })}
          onSubmit={async (values) => {
            handleOk();
            DFnewLogger(values);
            dispatch(editLoginDetails(values));
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
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.firstName && errors.firstName)}
                  >
                    <InputLabel>First Name</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="First Name"
                      value={values.firstName}
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.firstName && errors.firstName && (
                      <FormHelperText error>{errors.firstName}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.lastName && errors.lastName)}
                  >
                    <InputLabel>Last Name</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Last Name"
                      value={values.lastName}
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.lastName && errors.lastName && (
                      <FormHelperText error>{errors.lastName}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  >
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Email"
                      disabled
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error>{errors.email}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.currentPwd && errors.currentPwd)}
                  >
                    <InputLabel>Current Password</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Current Password"
                      value={values.currentPwd}
                      name="currentPwd"
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.currentPwd && errors.currentPwd && (
                      <FormHelperText error>{errors.currentPwd}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.newPwd && errors.newPwd)}
                  >
                    <InputLabel>New Password</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="New Password"
                      value={values.newPwd}
                      name="newPwd"
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.newPwd && errors.newPwd && (
                      <FormHelperText error>{errors.newPwd}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.confirmPwd && errors.confirmPwd)}
                  >
                    <OutlinedInput
                      size="small"
                      label="Confirm Password"
                      value={values.confirmPwd}
                      name="confirmPwd"
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.confirmPwd && errors.confirmPwd && (
                      <FormHelperText error>{errors.confirmPwd}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} className="h-align-right">
                  <Button
                    key="cancel"
                    className="account-no-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    key="submit"
                    className="account-yes-btn"
                    disableElevation
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
    </Box>
  );
};

export default Login;
