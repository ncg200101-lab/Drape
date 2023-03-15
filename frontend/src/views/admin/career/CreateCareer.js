import { Link } from 'react-router-dom';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
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
  Select,
  MenuItem,
  TextareaAutosize,
  useTheme
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import DFnewLogger from 'utils/DFnewLogger';

const CreateCareer = () => {
  const theme = useTheme();

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Create Career</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            school: '',
            degree: '',
            discipline: '',
            aboutJob: ''
          }}
          validationSchema={Yup.object().shape({
            school: Yup.string().max(30).required('School is required'),
            degree: Yup.string().max(30).required('Degree is required'),
            discipline: Yup.string().max(30).required('Discipline is required'),
            aboutJob: Yup.string().max(30).required('AboutJob is required')
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
                    error={Boolean(touched.school && errors.school)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-school">
                      School <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-school"
                      value={values.school}
                      name="school"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.school && errors.school && (
                      <FormHelperText id="helper-text" error>
                        {errors.school}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.degree && errors.degree)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-degree">
                      Degree <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-degree"
                      value={values.degree}
                      name="degree"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.degree && errors.degree && (
                      <FormHelperText id="helper-text" error>
                        {errors.degree}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.discipline && errors.discipline)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-discipline">
                      Discipline <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-discipline"
                      value={values.discipline}
                      name="discipline"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.discipline && errors.discipline && (
                      <FormHelperText id="helper-text" error>
                        {errors.discipline}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.aboutJob && errors.aboutJob)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-aboutJob">
                      About Job <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-aboutJob"
                      value={values.aboutJob}
                      name="aboutJob"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.aboutJob && errors.aboutJob && (
                      <FormHelperText id="helper-text" error>
                        {errors.aboutJob}
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
                    Create Career
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

export default CreateCareer;
