import { useEffect, useState } from 'react';
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
  TextField,
  useTheme,
  TextareaAutosize
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

const columns = [
  {
    accessorKey: 'giftCode',
    header: 'Gift Code'
  },
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    accessorKey: 'createdDate',
    header: 'Created Date'
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expiry Date'
  },
  {
    accessorKey: 'comment',
    header: 'Comment'
  },
  {
    accessorKey: 'action',
    header: 'Action'
  }
];

const GiftCodeAdmin = () => {
  const theme = useTheme();
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    setTableData(info);
  }, []);
  let minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">GiftCode Setting</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            giftcode: '',
            price: '',
            createdDate: new Date(),
            expiryDate: new Date(),
            comment: ''
          }}
          validationSchema={Yup.object().shape({
            giftcode: Yup.string()
              .min(10)
              .max(20)
              .required('PromoCode is required'),
            price: Yup.number()
              .min(0, 'Price is too low, try again')
              .max(100, 'Price is too high, try again')
              .required('Please input Price'),
            createdDate: Yup.date()
              .min(minDate, 'Invalid Created Date.')
              .typeError('Please select Created Date')
              .required('Please select Created Date'),
            expiryDate: Yup.date()
              .min(minDate, 'Invalid Expiry Date.')
              .typeError('Please select Expiry Date')
              .required('Please select Expiry Date')
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
            setFieldValue,
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
                    error={Boolean(touched.giftcode && errors.giftcode)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-name">
                      Giftcode <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-name"
                      value={values.giftcode}
                      name="giftcode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.giftcode && errors.giftcode && (
                      <FormHelperText id="helper-text" error>
                        {errors.giftcode}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.price && errors.price)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-price">
                      Price <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-price"
                      value={values.price}
                      type="number"
                      name="price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.price && errors.price && (
                      <FormHelperText id="helper-text" error>
                        {errors.price}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.createdDate && errors.createdDate)}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="createdDate"
                        value={values.createdDate}
                        onChange={(value) => {
                          const date = new Date(Date.parse(value));
                          setFieldValue('createdDate', date);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    {touched.createdDate && errors.createdDate && (
                      <FormHelperText id="helper-text" error>
                        {errors.createdDate}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.expiryDate && errors.expiryDate)}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="expiryDate"
                        value={values.expiryDate}
                        onChange={(value) => {
                          const date = new Date(Date.parse(value));
                          setFieldValue('expiryDate', date);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    {touched.expiryDate && errors.expiryDate && (
                      <FormHelperText id="helper-text" error>
                        {errors.expiryDate}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    sx={{ ...theme.typography.customInput }}
                  >
                    <TextareaAutosize
                      placeholder="comment"
                      style={{
                        minWidth: '100%',
                        maxWidth: '100%',
                        height: '100px',
                        minHeight: '80px',
                        padding: '1em',
                        borderColor: '#ccc',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                      value={values.about}
                      name="about"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className="admin-submit-btn"
                    disableElevation
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
      <Box className="table-border">
        <Table data={tableData} columns={columns} />
      </Box>
    </>
  );
};

export default GiftCodeAdmin;
