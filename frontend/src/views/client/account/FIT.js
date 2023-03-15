import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Box,
  Button,
  Typography,
  FormControl,
  FormHelperText,
  RadioGroup
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

//-- component
import DFnewLogger from 'utils/DFnewLogger';
//-- action
import {
  mEditSchedule,
  mGetSchedule,
  wEditSchedule,
  wGetSchedule
} from 'actions/profile';
import {
  kgEditSchedule,
  kgGetSchedule,
  kbEditSchedule,
  kbGetSchedule
} from 'actions/kids';

const FIT = () => {
  //-- get item from localstorage
  const fitFor = localStorage.getItem('fitFor');
  const order = localStorage.getItem('order');
  //-- hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wSchedule, mSchedule } = useSelector((state) => state.profile);
  const { kbSchedule, kgSchedule } = useSelector((state) => state.kids);
  const genderSchedule =
    fitFor === '0'
      ? wSchedule
      : fitFor === '1'
      ? mSchedule
      : fitFor === '3'
      ? kgSchedule
      : fitFor === '4'
      ? kbSchedule
      : null;
  const getFunc =
    fitFor === '0'
      ? wGetSchedule
      : fitFor === '1'
      ? mGetSchedule
      : fitFor === '3'
      ? kgGetSchedule
      : fitFor === '4'
      ? kbGetSchedule
      : null;
  const setFunc =
    fitFor === '0'
      ? wEditSchedule
      : fitFor === '1'
      ? mEditSchedule
      : fitFor === '3'
      ? kgEditSchedule
      : fitFor === '4'
      ? kbEditSchedule
      : null;
  useEffect(() => {
    DFnewLogger('GetSchedule______________________________');
    if (getFunc) {
      dispatch(getFunc(order));
    }
  }, [dispatch, getFunc, order]);
  //-- params
  const initVal = { deliveryMode: '', deliveryDate: new Date() };
  const schedule = [
    {
      title: 'EVERY MONTHLY',
      content: 'Will ship hand picked products in every month.'
    },
    {
      title: 'EVERY 2 MONTH',
      content: 'Try a FIT in every two months.'
    },
    {
      title: 'EVERY 3 MONTH',
      content: 'Try a FIT in every three months.'
    }
  ];

  return (
    <Grid container>
      <Grid item xs={12} className="schedule">
        <Typography className="schedule-title">
          MANAGE YOUR FIT SETTINGS
        </Typography>
        <Typography className="schedule-content">
          Please select your schedule
        </Typography>
        <Formik
          initialValues={genderSchedule === null ? initVal : genderSchedule}
          enableReinitialize
          validationSchema={Yup.object().shape({
            deliveryMode: Yup.number()
              .min(0)
              .max(4)
              .required('Please select FIT Schedule')
          })}
          onSubmit={async (values) => {
            DFnewLogger(values);
            if (setFunc) {
              dispatch(setFunc(values, null, order));
            }
          }}
        >
          {({
            errors,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            touched,
            values
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.deliveryMode && errors.deliveryMode)}
              >
                <RadioGroup
                  row
                  aria-labelledby="demo-customized-radios"
                  name="deliveryMode"
                  value={values.deliveryMode}
                >
                  <Grid
                    container
                    spacing={2}
                    sx={{ padding: { xs: '20px 10px', xl: '20px 8vw' } }}
                  >
                    <Grid item xs={12} className="h-align-center">
                      {touched.deliveryMode && errors.deliveryMode && (
                        <FormHelperText id="helper-text" error>
                          {errors.deliveryMode}
                        </FormHelperText>
                      )}
                    </Grid>
                    {schedule.map((item, index) => (
                      <Grid
                        key={index}
                        item
                        xs={12}
                        lg={4}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Box
                          className="schedule-box"
                          onClick={() => setFieldValue('deliveryMode', index)}
                          style={{
                            backgroundColor:
                              values.deliveryMode === index ? '#e1e1e1' : '#fff'
                          }}
                        >
                          <Box width="100%">
                            <Typography className="schedule-sub-title">
                              {item.title}
                            </Typography>
                            <Typography className="schedule-content">
                              {item.content}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Typography className="schedule-content">
                        Until you cancel your Fit Schedule we will charge a
                        styling Fees $20 depends on your style delivery
                        frequency.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} className="h-align-right">
                      <Button
                        className="account-yes-btn"
                        type="submit"
                        disableElevation
                        disabled={isSubmitting}
                      >
                        SAVE
                      </Button>
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default FIT;
