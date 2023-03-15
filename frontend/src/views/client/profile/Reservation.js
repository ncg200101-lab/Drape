import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Grid, Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

//-- component
import NavTabs from '../component/profile/NavTabs';
import DFnewLogger from 'utils/DFnewLogger';
//-- action
import { mGetSchedule, wGetSchedule } from 'actions/profile';
import { kgGetSchedule, kbGetSchedule } from 'actions/kids';

const Reservation = () => {
  //-- get item from localstorage
  const fitFor = localStorage.getItem('fitFor');
  const order = localStorage.getItem('order');
  //-- hooks
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
  useEffect(() => {
    DFnewLogger('GetSchedule______________________________');
    if (getFunc) {
      dispatch(getFunc(order));
    }
  }, [dispatch, getFunc, order]);

  const addDays = (date, days) => {
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    return date;
  };
  const bsp2comma = (string) => {
    return string.replaceAll(' ', ', ');
  };
  const startDate = new Date(genderSchedule?.deliveryDate).toDateString();
  const endDate = addDays(
    new Date(genderSchedule?.deliveryDate),
    7
  ).toDateString();
  return (
    <>
      <NavTabs />
      <Divider />
      <Grid className="reservation" container>
        <Grid item xs={12} className="schedule">
          <Typography className="schedule-title">
            YOUR STYLE FIT BOX ORDER INFORMATION
          </Typography>
          <Typography className="basic-info-title">
            The estimated shipping window is
          </Typography>
          <Typography className="basic-info-title">
            {bsp2comma(startDate).slice(0, 8) + bsp2comma(startDate).slice(9)} -{' '}
            {bsp2comma(endDate).slice(0, 8) + bsp2comma(endDate).slice(9)}
          </Typography>
          <br />
          <Typography className="basic-info-content">
            Email us at{' '}
            <span className="basic-info-sub-title">support@drapefit.com</span>{' '}
            for any questions or suggestions.
          </Typography>
          <Link to="/customer-care/contact-us">
            <Button className="rounded-orange-btn">Support</Button>
          </Link>
          <Typography className="basic-info-content">
            Please complete your payment and shipping to have your reservation
            30 minutes.
          </Typography>
          <Link to="/welcome/addressbook">
            <Button className="profile-gradient-btn" style={{ float: 'right' }}>
              NEXT: SHIPPING ADDRESS&nbsp;&nbsp;&nbsp;
              <FontAwesomeIcon icon={faLongArrowRight} />
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default Reservation;
