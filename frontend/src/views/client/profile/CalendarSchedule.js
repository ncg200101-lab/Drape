import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Button,
  Divider,
  Typography,
  FormControl,
  FormHelperText,
  RadioGroup
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//-- component
import NavTabs from '../component/profile/NavTabs';
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

const CalendarSchedule = () => {
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
  const initVal = {
    deliveryMode: '',
    deliveryDate: new Date()
  };
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
    <>
      <NavTabs />
      <Divider />
      <Grid container className="profile">
        <Grid item xs={12} className="schedule">
          <Formik
            initialValues={
              genderSchedule === null
                ? initVal
                : {
                    deliveryDate: new Date(genderSchedule.deliveryDate),
                    deliveryMode: genderSchedule.deliveryMode
                  }
            }
            // initialValues={initVal}
            enableReinitialize
            validationSchema={Yup.object().shape({
              deliveryMode: Yup.number()
                .min(0)
                .max(4)
                .required('Please select FIT Schedule'),
              deliveryDate: Yup.date()
                .min(new Date(), 'Previous dates cannot be selected.')
                .typeError('Please select Delivery date')
                .required('Please select Delivery date')
            })}
            onSubmit={async (values) => {
              DFnewLogger(values);
              if (setFunc) {
                dispatch(setFunc(values, navigate, order));
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
                <Grid container>
                  <Grid item xs={12} className="h-align-center">
                    <Calendar
                      onChange={(e) => setFieldValue('deliveryDate', e)}
                      value={values.deliveryDate}
                    />
                  </Grid>
                  <Grid item xs={12} className="h-align-center">
                    {touched.deliveryDate && errors.deliveryDate && (
                      <FormHelperText id="helper-text" error>
                        {errors.deliveryDate}
                      </FormHelperText>
                      // <Alert />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(
                        touched.deliveryMode && errors.deliveryMode
                      )}
                    >
                      <RadioGroup
                        row
                        aria-labelledby="demo-customized-radios"
                        name="deliveryMode"
                        value={values.deliveryMode}
                      >
                        <Grid container spacing={3} padding="20px 8vw">
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
                                onClick={() =>
                                  setFieldValue('deliveryMode', index)
                                }
                                style={{
                                  backgroundColor:
                                    values.deliveryMode === index
                                      ? '#e1e1e1'
                                      : '#fff'
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
                          <Grid item xs={12} className="h-align-center">
                            {touched.deliveryMode && errors.deliveryMode && (
                              <FormHelperText id="helper-text" error>
                                {errors.deliveryMode}
                              </FormHelperText>
                            )}
                          </Grid>
                          <Grid item xs={12}>
                            <Typography className="schedule-content">
                              Until you cancel your Fit Schedule we will charge
                              a styling Fees $20 depends on your style delivery
                              frequency.
                            </Typography>
                            <Button
                              type="submit"
                              disableElevation
                              disabled={isSubmitting}
                              className="profile-gradient-btn"
                              style={{ float: 'right' }}
                            >
                              CONTINUE
                            </Button>
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default CalendarSchedule;
