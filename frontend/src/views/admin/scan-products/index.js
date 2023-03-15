import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  useTheme,
  Grid
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import DFnewLogger from 'utils/DFnewLogger';

const ScanProducts = () => {
  const theme = useTheme();

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Create Employee</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{ product: '' }}
          validationSchema={Yup.object().shape({
            product: Yup.string()
              .max(30, 'Product Name is too long')
              .required('Product Name is required')
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
              <Grid container className="h-align-center">
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="h-align-center"
                >
                  <FormControl
                    fullWidth
                    error={Boolean(touched.product && errors.product)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel>Product Scan</InputLabel>
                    <OutlinedInput
                      id="outlined-product"
                      value={values.product}
                      name="product"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.product && errors.product && (
                      <FormHelperText error>{errors.product}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} className="h-align-center">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="h-align-right"
                  >
                    <Button
                      className="admin-submit-btn"
                      disableElevation
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Scan
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
};

export default ScanProducts;
