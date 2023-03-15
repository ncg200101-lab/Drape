import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
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
  useTheme,
  Divider
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard,
  faEdit,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

const ManageSalesTax = () => {
  const theme = useTheme();
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        name: faker.name.fullName(),
        minZip: faker.address.zipCode('#####'),
        maxZip: faker.address.zipCode('#####'),
        rate: faker.datatype.float({ min: 0.0, max: 100.0 }),
        action: action_btn
      });
    }
    setTableData(info);
  }, []);
  DFnewLogger(tableData);
  const action_btn = (
    <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
      <Tooltip title="Edit" arrow>
        <Button
          className="admin-table-btn edit"
          onClick={() => {
            handleModal();
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
      accessorKey: 'name',
      header: 'Name'
    },
    {
      accessorKey: 'minZip',
      header: 'Zipcode min'
    },
    {
      accessorKey: 'maxZip',
      header: 'Zipcode max'
    },
    {
      accessorKey: 'rate',
      header: 'Tax rate'
    },
    {
      accessorKey: 'action',
      header: 'Action'
    }
  ];
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Manage Sales Tax</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            name: '',
            rate: '',
            minZip: '',
            maxZip: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(50).required('State name is required'),
            minZip: Yup.number()
              .min(10000, 'Invalid zipcode, try again')
              .max(99999, 'Invalid zipcode, try again')
              .required('Please input min Zipcode'),
            maxZip: Yup.number()
              .min(10000, 'Invalid zipcode, try again')
              .max(99999, 'Invalid zipcode, try again')
              .required('Please input max Zipcode'),
            rate: Yup.number()
              .min(0, 'Invalid Tax rate, try again')
              .max(100, 'Invalid Tax rate, try again')
              .required('Please input tax rate')
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
                    error={Boolean(touched.name && errors.name)}
                  >
                    <InputLabel>
                      State Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="State Name *"
                      id="outlined-name"
                      value={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText id="helper-text" error>
                        {errors.name}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.rate && errors.rate)}
                  >
                    <InputLabel>
                      Tax Rate <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Tax Rate *"
                      id="outlined-rate"
                      value={values.rate}
                      type="number"
                      name="rate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.rate && errors.rate && (
                      <FormHelperText id="helper-text" error>
                        {errors.rate}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.minZip && errors.minZip)}
                  >
                    <InputLabel>
                      Zipcode Min <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Zipcode Min *"
                      id="outlined-minZip"
                      value={values.minZip}
                      type="number"
                      name="minZip"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.minZip && errors.minZip && (
                      <FormHelperText id="helper-text" error>
                        {errors.minZip}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.maxZip && errors.maxZip)}
                  >
                    <InputLabel>
                      Zipcode Max <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Zipcode Max *"
                      id="outlined-maxZip"
                      value={values.maxZip}
                      type="number"
                      name="maxZip"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.maxZip && errors.maxZip && (
                      <FormHelperText id="helper-text" error>
                        {errors.maxZip}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
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
      <Modal
        open={open}
        title="Edit Sales Tax"
        onOk={handleModal}
        onCancel={handleModal}
        footer={null}
        className="edit-modal"
      >
        <Formik
          initialValues={{
            name: '',
            rate: '',
            minZip: '',
            maxZip: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(50).required('State name is required'),
            minZip: Yup.number()
              .min(10000, 'Invalid zipcode, try again')
              .max(99999, 'Invalid zipcode, try again')
              .required('Please input min Zipcode'),
            maxZip: Yup.number()
              .min(10000, 'Invalid zipcode, try again')
              .max(99999, 'Invalid zipcode, try again')
              .required('Please input max Zipcode'),
            rate: Yup.number()
              .min(0, 'Invalid Tax rate, try again')
              .max(100, 'Invalid Tax rate, try again')
              .required('Please input tax rate')
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
                  <FormControl
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  >
                    <InputLabel>
                      State Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="State Name *"
                      id="outlined-name"
                      value={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText id="helper-text" error>
                        {errors.name}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.rate && errors.rate)}
                  >
                    <InputLabel>
                      Tax Rate <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Tax Rate *"
                      id="outlined-rate"
                      value={values.rate}
                      type="number"
                      name="rate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.rate && errors.rate && (
                      <FormHelperText id="helper-text" error>
                        {errors.rate}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.minZip && errors.minZip)}
                  >
                    <InputLabel>
                      Zipcode Min <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Zipcode Min *"
                      id="outlined-minZip"
                      value={values.minZip}
                      type="number"
                      name="minZip"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.minZip && errors.minZip && (
                      <FormHelperText id="helper-text" error>
                        {errors.minZip}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.maxZip && errors.maxZip)}
                  >
                    <InputLabel>
                      Zipcode Max <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Zipcode Max *"
                      id="outlined-maxZip"
                      value={values.maxZip}
                      type="number"
                      name="maxZip"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.maxZip && errors.maxZip && (
                      <FormHelperText id="helper-text" error>
                        {errors.maxZip}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} className="h-align-right">
                  <Button
                    key="cancel"
                    className="account-no-btn"
                    onClick={handleModal}
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
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ManageSalesTax;
