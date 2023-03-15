import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
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
  Tooltip,
  TextField,
  useTheme,
  TextareaAutosize
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard,
  faEdit,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

const action_btn = (
  <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
    <Tooltip title="Edit" arrow>
      <Button
        className="admin-table-btn edit"
        onClick={() => {
          DFnewLogger('Table/edit_action');
        }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>
    </Tooltip>
    <Tooltip title="Delete" arrow>
      <Button
        className="admin-table-btn delete"
        onClick={() => {
          DFnewLogger('Table/delete_action');
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </Button>
    </Tooltip>
  </div>
);

const columns = [
  {
    accessorKey: 'offerCode',
    header: 'OfferCode'
  },
  {
    accessorKey: 'minimumPurchase',
    header: 'Minimum Purchase'
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

const PromocodeSetting = () => {
  const theme = useTheme();
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        offerCode: faker.random.alphaNumeric(12),
        minimumPurchase: '$' + faker.datatype.float({ min: 0.0, max: 100.0 }),
        price: '$' + faker.datatype.float({ min: 0.0, max: 100.0 }),
        createdDate: faker.date
          .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
          .toISOString()
          .slice(0, 10),
        expiryDate: faker.date
          .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
          .toISOString()
          .slice(0, 10),
        comment: faker.lorem.sentences(2),
        action: action_btn
      });
    }
    setTableData(info);
  }, []);
  let minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Offer Promocode</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            promocode: '',
            price: '',
            createdDate: new Date(),
            expiryDate: new Date(),
            comment: ''
          }}
          validationSchema={Yup.object().shape({
            promocode: Yup.string()
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
              .required('Please select Expiry Date'),
            minimumPurchasePrice: Yup.number()
              .min(0, 'Minimum Purchase Price is too low, try again')
              .max(100, 'Minimum Purchase Price is too high, try again')
              .required('Please input Minimum Purchase Price')
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
                    error={Boolean(touched.promocode && errors.promocode)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-name">
                      Promocode <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-name"
                      value={values.promocode}
                      name="promocode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.promocode && errors.promocode && (
                      <FormHelperText id="helper-text" error>
                        {errors.promocode}
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
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(
                      touched.minimumPurchasePrice &&
                        errors.minimumPurchasePrice
                    )}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-minimumPurchasePrice">
                      Minimum Purchase Price{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-minimumPurchasePrice"
                      value={values.minimumPurchasePrice}
                      type="number"
                      name="minimumPurchasePrice"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.minimumPurchasePrice &&
                      errors.minimumPurchasePrice && (
                        <FormHelperText id="helper-text" error>
                          {errors.minimumPurchasePrice}
                        </FormHelperText>
                      )}
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

export default PromocodeSetting;
