import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  useTheme,
  Grid
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import DFnewLogger from 'utils/DFnewLogger';

const ValueSet = () => {
  const theme = useTheme();

  return (
    <Formik
      initialValues={{
        salesTax: '',
        parentStyleFee: '',
        kidStyleFee: '',
        toHelpBatch: '',
        password: '',
        toHelp: '',
        checkoutTimeFee: '',
        inviteFriend: '',
        toEmail: '',
        fromEmail: ''
      }}
      validationSchema={Yup.object().shape({
        salesTax: Yup.number()
          .min(0, 'Sales Tax is too low')
          .max(100, 'Sales Tax is too high')
          .required('Please input Sales Tax'),
        parentStyleFee: Yup.number()
          .min(0, 'Parent Style Fee is too low')
          .max(100, 'Parent Style Fee is too high')
          .required('Please input Parent Style Fee'),
        kidStyleFee: Yup.number()
          .min(0, 'Kid Style Fit is too low')
          .max(100, 'Kid Style Fit is too high')
          .required('Please input Kid Style Fee'),
        toHelpBatch: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('To Help Batch Email is required'),
        password: Yup.string()
          .min(6)
          .max(255)
          .required('Please input Password'),
        toHelp: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('To Help Email is required'),
        checkoutTimeFee: Yup.number()
          .min(0, 'Checkout Time Fee is too low')
          .max(100, 'Checkout Time Fee is too high')
          .required('Please input Checkout Time Fee'),
        inviteFriend: Yup.number()
          .min(0, 'Invite Friends Bonus is too low')
          .max(0, 'Invite Friends Bonus is too high')
          .required('Please input Invite Friend Bonus'),
        toEmail: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('To Email is required'),
        fromEmail: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('From Email is required')
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
              <Grid container>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.salesTax && errors.salesTax)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel>Sales tax for $100</InputLabel>
                    <OutlinedInput
                      value={values.salesTax}
                      name="salesTax"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.salesTax && errors.salesTax && (
                      <FormHelperText error>{errors.salesTax}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(
                      touched.parentStyleFee && errors.parentStyleFee
                    )}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel>Men, Women Styling Fees</InputLabel>
                    <OutlinedInput
                      value={values.parentStyleFee}
                      name="parentStyleFee"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.parentStyleFee && errors.parentStyleFee && (
                      <FormHelperText error>
                        {errors.parentStyleFee}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.kidStyleFee && errors.kidStyleFee)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel>Kid Style Fee</InputLabel>
                    <OutlinedInput
                      value={values.kidStyleFee}
                      name="kidStyleFee"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.kidStyleFee && errors.kidStyleFee && (
                      <FormHelperText error>
                        {errors.kidStyleFee}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(
                      touched.checkoutTimeFee && errors.checkoutTimeFee
                    )}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel>
                      Styling Fees Adjustment With Checkout Time
                    </InputLabel>
                    <OutlinedInput
                      value={values.checkoutTimeFee}
                      name="checkoutTimeFee"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.checkoutTimeFee && errors.checkoutTimeFee && (
                      <FormHelperText error>
                        {errors.checkoutTimeFee}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.inviteFriend && errors.inviteFriend)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel>Invite Friends</InputLabel>
                    <OutlinedInput
                      value={values.inviteFriend}
                      name="inviteFriend"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.inviteFriend && errors.inviteFriend && (
                      <FormHelperText error>
                        {errors.inviteFriend}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.toHelpBatch && errors.toHelpBatch)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel>TO HELP BATCH</InputLabel>
                    <OutlinedInput
                      value={values.toHelpBatch}
                      name="toHelpBatch"
                      type="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.toHelpBatch && errors.toHelpBatch && (
                      <FormHelperText error>
                        {errors.toHelpBatch}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel>???</InputLabel>
                    <OutlinedInput
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error>{errors.password}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.toHelp && errors.toHelp)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel>TO HELP</InputLabel>
                    <OutlinedInput
                      value={values.toHelp}
                      name="toHelp"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.toHelp && errors.toHelp && (
                      <FormHelperText error>{errors.toHelp}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.toEmail && errors.toEmail)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel>To Email</InputLabel>
                    <OutlinedInput
                      value={values.toEmail}
                      name="toEmail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.toEmail && errors.toEmail && (
                      <FormHelperText error>{errors.toEmail}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.fromEmail && errors.fromEmail)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel>From Email</InputLabel>
                    <OutlinedInput
                      value={values.fromEmail}
                      name="fromEmail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.fromEmail && errors.fromEmail && (
                      <FormHelperText error>{errors.fromEmail}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} className="h-align-right">
                <Button
                  className="admin-submit-btn"
                  disableElevation={isSubmitting}
                  type="submit"
                >
                  SAVE
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ValueSet;
