import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  useTheme
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

//-- component
import DFnewLogger from 'utils/DFnewLogger';

const Password = () => {
  //-- hooks
  const theme = useTheme();
  //-- params
  const initVal = {
    currentPwd: '',
    newPwd: '',
    confirmPwd: ''
  };

  return (
    <Box className="setting-password">
      <Formik
        initialValues={initVal}
        enableReinitialize
        validationSchema={Yup.object().shape({
          currentPwd: Yup.string().min(6).max(255).notRequired(),
          newPwd: Yup.string().min(6).max(255).notRequired(),
          confirmPwd: Yup.string().min(6).max(255).notRequired()
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
          <Form>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.currentPwd && errors.currentPwd)}
                >
                  <InputLabel>Current Password</InputLabel>
                  <OutlinedInput
                    size="small"
                    label="Current Passowrd"
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
                    label="New Passowrd"
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
                  <InputLabel>Confirm Password</InputLabel>
                  <OutlinedInput
                    size="small"
                    label="Confirm Passowrd"
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
                  className="admin-submit-btn"
                  disableElevation
                  disabled={isSubmitting}
                  type="submit"
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Password;
