import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Divider,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
  useTheme,
  Alert,
  useMediaQuery
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import { Modal } from 'antd';

//-- component
import NavTabs from '../component/profile/NavTabs';
import AnimateButton from 'ui-component/extended/AnimateButton';
import DFnewLogger from 'utils/DFnewLogger';
//-- action
import {
  mAddNewAddress,
  mDeleteAddress,
  mGetAllAddress,
  mSetDefaultAddress,
  wAddNewAddress,
  wDeleteAddress,
  wGetAllAddress,
  wSetDefaultAddress
} from 'actions/profile';
import {
  kgAddNewAddress,
  kgGetAllAddress,
  kgDeleteAddress,
  kgSetDefaultAddress,
  kbAddNewAddress,
  kbGetAllAddress,
  kbDeleteAddress,
  kbSetDefaultAddress
} from 'actions/kids';

const AddressBook = () => {
  //-- get item from localstorage
  const fitFor = localStorage.getItem('fitFor');
  const order = localStorage.getItem('order');
  //-- hooks
  const dispatch = useDispatch();
  const { wAllAddress, mAllAddress } = useSelector((state) => state.profile);
  const { kgAllAddress, kbAllAddress } = useSelector((state) => state.kids);
  const genderAllAddress =
    fitFor === '0'
      ? wAllAddress
      : fitFor === '1'
      ? mAllAddress
      : fitFor === '3'
      ? kgAllAddress
      : fitFor === '4'
      ? kbAllAddress
      : [];
  const getFunc =
    fitFor === '0'
      ? wGetAllAddress
      : fitFor === '1'
      ? mGetAllAddress
      : fitFor === '3'
      ? kgGetAllAddress
      : fitFor === '4'
      ? kbGetAllAddress
      : null;
  const addFunc =
    fitFor === '0'
      ? wAddNewAddress
      : fitFor === '1'
      ? mAddNewAddress
      : fitFor === '3'
      ? kgAddNewAddress
      : fitFor === '4'
      ? kbAddNewAddress
      : null;
  const delFunc =
    fitFor === '0'
      ? wDeleteAddress
      : fitFor === '1'
      ? mDeleteAddress
      : fitFor === '3'
      ? kgDeleteAddress
      : fitFor === '4'
      ? kbDeleteAddress
      : null;
  const setFunc =
    fitFor === '0'
      ? wSetDefaultAddress
      : fitFor === '1'
      ? mSetDefaultAddress
      : fitFor === '3'
      ? kgSetDefaultAddress
      : fitFor === '4'
      ? kbSetDefaultAddress
      : null;
  useEffect(() => {
    DFnewLogger('GetAllAddress______________________________');
    if (getFunc) {
      dispatch(getFunc(order));
    }
  }, [dispatch, getFunc, order]);
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [initVal, setInitVal] = useState({
    fullName: '',
    addrLine1: '',
    addrLine2: '',
    city: '',
    stateProvcRegion: '',
    zip: '',
    country: '',
    phoneNum: ''
  });
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
  const selectProps = {
    PaperProps: {
      style: {
        maxHeight: 360,
        width: 250
      }
    }
  };

  return (
    <>
      <NavTabs />
      <Divider />
      <Box className="addressbook">
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <span className="overview-sup-title">ADDRESS DETAILS</span>
            <Button
              className="add-new-address"
              onClick={() => {
                setInitVal({
                  fullName: '',
                  addrLine1: '',
                  addrLine2: '',
                  city: '',
                  stateProvcRegion: '',
                  zip: '',
                  country: '',
                  phoneNum: ''
                });
                showModal();
              }}
            >
              {matchDownSM ? '+' : 'Add New Address'}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <AnimateButton>
              <Link to="/welcome/payment">
                <Button
                  className="set-default-btn"
                  sx={{
                    float: 'right',
                    zIndex: genderAllAddress.length === 0 ? '-1' : '1',
                    opacity: genderAllAddress.length === 0 ? '0.5' : '1',
                    cursor:
                      genderAllAddress.length === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  NEXT: PAYMENT&nbsp;&nbsp;&nbsp;
                  <FontAwesomeIcon icon={faLongArrowRight} />
                </Button>
              </Link>
            </AnimateButton>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ borderColor: '#ff6c00', marginBottom: '20px' }} />
          </Grid>
          {genderAllAddress.length === 0 ? (
            <Alert severity="error">
              No valid address. Please add your address.
            </Alert>
          ) : (
            genderAllAddress.map((item, index) => (
              <Grid item xs={12} md={6} xl={4} key={index}>
                <Box className="address-box">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography className="overview-sup-title">
                        <i>{item.fullName}</i>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-title">
                        Address1:{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-content">
                        {item.addrLine1}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-title">
                        Address2:{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-content">
                        {item.addrLine2}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-title">City: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-content">
                        {item.city}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-title">
                        State:{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-content">
                        {item.stateProvcRegion}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-title">Zip: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-content">
                        {item.zip}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-title">
                        Country:{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-content">
                        {item.country}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-title">
                        Phone:{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-content">
                        {item.phoneNum}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} className="h-align-right">
                      <Button
                        className="account-no-btn"
                        onClick={() => {
                          if (delFunc) {
                            dispatch(delFunc(item._id, order));
                          }
                        }}
                      >
                        DELETE
                      </Button>
                      <Button
                        className="account-yes-btn"
                        onClick={() => {
                          showModal();
                          setInitVal(item);
                        }}
                      >
                        EDIT
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      {item.isDefault === true ? (
                        <Button fullWidth className="set-default-btn default">
                          DEFAULT ADDRESS
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          className="set-default-btn"
                          onClick={() => dispatch(setFunc(item._id, order))}
                        >
                          DELIVER TO THIS ADDRESS
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
        <Modal
          open={open}
          title="Address"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Formik
            initialValues={initVal}
            enableReinitialize
            validationSchema={Yup.object().shape({
              fullName: Yup.string().max(30).required('Name is required'),
              addrLine1: Yup.string()
                .max(255)
                .required('Address Line 1 is required'),
              city: Yup.string().max(255).required('City is required'),
              stateProvcRegion: Yup.string()
                .max(255)
                .required('Region is required'),
              zip: Yup.number()
                .min(10000)
                .max(99999)
                .required('Zip Code is required'),
              country: Yup.string().max(255).required('Country is required'),
              phoneNum: Yup.string()
                .phone('Invalid Phone Number')
                .required('Phone Number is required')
            })}
            onSubmit={async (values) => {
              DFnewLogger(values);
              if (addFunc) {
                dispatch(addFunc(values, order));
                handleCancel();
                setInitVal({
                  fullName: '',
                  addrLine1: '',
                  addrLine2: '',
                  city: '',
                  stateProvcRegion: '',
                  zip: '',
                  country: '',
                  phoneNum: ''
                });
              }
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
                <Grid container rowSpacing={2}>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.fullName && errors.fullName)}
                    >
                      <InputLabel>
                        Full Name <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Full Name *"
                        value={values.fullName}
                        name="fullName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.fullName && errors.fullName && (
                        <FormHelperText error>{errors.fullName}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.addrLine1 && errors.addrLine1)}
                    >
                      <InputLabel>
                        Address Line 1 <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Address Line 1 *"
                        value={values.addrLine1}
                        name="addrLine1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.addrLine1 && errors.addrLine1 && (
                        <FormHelperText error>
                          {errors.addrLine1}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>
                        Address Line 2 <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Address Line 2 *"
                        value={values.addrLine2}
                        name="addrLine2"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.city && errors.city)}
                    >
                      <InputLabel>
                        City <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="City *"
                        value={values.city}
                        name="city"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.city && errors.city && (
                        <FormHelperText error>{errors.city}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(
                        touched.stateProvcRegion && errors.stateProvcRegion
                      )}
                    >
                      <InputLabel>
                        Region <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Region *"
                        value={values.stateProvcRegion}
                        name="stateProvcRegion"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.stateProvcRegion && errors.stateProvcRegion && (
                        <FormHelperText error>
                          {errors.stateProvcRegion}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.zip && errors.zip)}
                    >
                      <InputLabel>
                        Zip ( 5 Digit [0 - 9] Pincode ){' '}
                        <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Zip ( 5 Digit [0 - 9] Pincode ) *"
                        value={values.zip}
                        type="number"
                        name="zip"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.zip && errors.zip && (
                        <FormHelperText error>{errors.zip}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.country && errors.country)}
                    >
                      <InputLabel>
                        Country <span style={{ color: 'red' }}>*</span>
                      </InputLabel>{' '}
                      <Select
                        size="small"
                        label="Country *"
                        value={values.country}
                        name="country"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        MenuProps={selectProps}
                      >
                        <MenuItem value="usa">United States</MenuItem>
                      </Select>
                      {touched.country && errors.country && (
                        <FormHelperText error>{errors.country}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.phoneNum && errors.phoneNum)}
                    >
                      <InputLabel>
                        Phone Number <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Phone Number *"
                        value={values.phoneNum}
                        name="phoneNum"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.phoneNum && errors.phoneNum && (
                        <FormHelperText error>{errors.phoneNum}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Box className="h-align-right">
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
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Modal>
      </Box>
    </>
  );
};

export default AddressBook;
