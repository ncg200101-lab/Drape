import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  TextareaAutosize,
  useTheme,
  Grid
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';

import DFnewLogger from 'utils/DFnewLogger';

const Profile = () => {
  const theme = useTheme();

  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '', address: '' }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .min(3, 'Name is too short')
          .max(30, 'Name is too long')
          .required('Please input your Name'),
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        phone: Yup.string()
          .phone('Invalid Phone Number')
          .required('Phone Number is required'),
        address: Yup.string()
          .min(3, 'Address is too short')
          .max(1000, 'Address is too long')
          .required('Please input your Address')
      })}
      onSubmit={async (values) => {
        DFnewLogger(values);
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
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  >
                    <InputLabel>Name</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Name"
                      value={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText error>{errors.name}</FormHelperText>
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
                    error={Boolean(touched.phone && errors.phone)}
                  >
                    <InputLabel>Phone</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Phone"
                      value={values.phone}
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.phone && errors.phone && (
                      <FormHelperText error>{errors.phone}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={Boolean(touched.address && errors.address)}
              >
                <TextareaAutosize
                  placeholder="Address"
                  style={{
                    minWidth: '100%',
                    maxWidth: '100%',
                    minHeight: '125px',
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
                {touched.address && errors.address && (
                  <FormHelperText error>{errors.address}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} className="h-align-right">
              <Button
                className="admin-submit-btn"
                disableElevation
                disabled={isSubmitting}
                type="submit"
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default Profile;
