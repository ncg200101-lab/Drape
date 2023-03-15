import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Paper,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  useTheme,
  Divider
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import DFnewLogger from 'utils/DFnewLogger';

const ChargeClient = () => {
  const theme = useTheme();

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Client Manual Charge</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            email: '',
            amount: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required'),
            amount: Yup.number().min(1).max(1000).required('Amount is required')
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
                <Grid item xs={12}>
                  <Typography color="#ff0000">
                    All (*) fields are mandatory
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-email">
                      Email Address <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
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
                    error={Boolean(touched.amount && errors.amount)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-amount">
                      Amount <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      value={values.amount}
                      type="number"
                      name="amount"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.amount && errors.amount && (
                      <FormHelperText error>{errors.amount}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className="admin-submit-btn"
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
      </Paper>
    </>
  );
};

export default ChargeClient;
