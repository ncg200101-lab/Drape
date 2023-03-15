import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Box,
  Typography,
  Tooltip,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Breadcrumbs,
  Dialog,
  DialogActions,
  DialogTitle,
  TextareaAutosize
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard,
  faEdit,
  faTrashCan,
  faCheck,
  faMultiply
} from '@fortawesome/free-solid-svg-icons';
import { faGg } from '@fortawesome/free-brands-svg-icons';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import MaterialReactTable from 'material-react-table';
import { format } from 'date-fns';

import { strengthColor, strengthIndicator } from 'utils/PwdStrength';
import DFnewLogger from 'utils/DFnewLogger';
import {
  getBrand,
  editBrand,
  deleteBrand,
  changeBrandPwd,
  toggleBrandActive
} from 'actions/invBrand';
import { FirstUpper } from 'utils/FirstUpper';

const ViewBrand = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [strengthPassword, setStrengthPassword] = useState(0);
  const [levelPassword, setLevelPassword] = useState();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrengthPassword(temp);
    setLevelPassword(strengthColor(temp));
  };
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [strengthConfirmPwd, setStrengthConfirmPwd] = useState(0);
  const [levelConfirmPwd, setLevelConfirmPwd] = useState();
  const handleClickShowConfirmPwd = () => {
    setShowConfirmPwd(!showConfirmPwd);
  };
  const handleMouseDownConfirmPwd = (event) => {
    event.preventDefault();
  };
  const changeConfirmPwd = (value) => {
    const temp = strengthIndicator(value);
    setStrengthConfirmPwd(temp);
    setLevelConfirmPwd(strengthColor(temp));
  };
  //table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  //modal form
  const [initPwd, setInitPwd] = useState({
    _id: '',
    email: '',
    password: '',
    confirmPwd: ''
  });
  const [initEdit, setInitEdit] = useState({
    _id: '',
    name: '',
    email: '',
    phone: '',
    type: '',
    about: '',
    address: ''
  });
  const [id, setId] = useState('');
  const [toggleMsg, setToggleMsg] = useState('');
  const [openPwd, setOpenPwd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);
  const handlePwdDialog = () => {
    setOpenPwd(!openPwd);
  };
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };
  const handleToggleDialog = () => {
    setOpenToggle(!openToggle);
  };
  useEffect(() => {
    dispatch(
      getBrand({
        start: pagination.pageIndex * pagination.pageSize,
        size: pagination.pageSize,
        filters: JSON.stringify(columnFilters ?? []),
        globalFilter: globalFilter ?? '',
        sorting: JSON.stringify(sorting ?? [])
      })
    );
  }, [dispatch, columnFilters, globalFilter, sorting, pagination]);
  const { tableData, rowCount } = useSelector((state) => state.invBrand);
  let updateData = [];
  let rowNum = pagination.pageIndex * pagination.pageSize;
  if (tableData.length) {
    updateData = tableData.map((item, index) => {
      const action_btn = (
        <div
          key={index}
          style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}
        >
          <Tooltip title="Set Password" arrow>
            <Button
              className="admin-table-btn password"
              onClick={() => {
                setInitPwd({
                  _id: item._id,
                  email: item.email,
                  password: '',
                  confirmPwd: ''
                });
                handlePwdDialog();
              }}
            >
              <FontAwesomeIcon icon={faGg} />
            </Button>
          </Tooltip>
          <Tooltip title="Edit" arrow>
            <Button
              className="admin-table-btn edit"
              onClick={() => {
                setInitEdit(item);
                handleEditDialog();
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <Button
              className="admin-table-btn delete"
              onClick={() => {
                setId(item._id);
                handleDeleteDialog();
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </Tooltip>
          {item.isActive === 1 ? (
            <Tooltip title="Deactivate" arrow>
              <Button
                className="admin-table-btn deactive"
                onClick={() => {
                  setId(item._id);
                  setToggleMsg('de');
                  handleToggleDialog();
                }}
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Activate" arrow>
              <Button
                className="admin-table-btn disabled"
                onClick={() => {
                  setId(item._id);
                  setToggleMsg('');
                  handleToggleDialog();
                }}
              >
                <FontAwesomeIcon icon={faMultiply} />
              </Button>
            </Tooltip>
          )}
        </div>
      );
      rowNum++;
      return {
        ...item,
        no: rowNum,
        name: item.firstName + ' ' + item.lastName,
        createdAt: format(new Date(item.createdAt), 'yyyy-MM-dd HH:mm:ss'),
        isActive: item.isActive === 0 ? 'Inactive' : 'Active',
        action: action_btn
      };
    });
  }
  const columns = [
    {
      accessorKey: 'no',
      header: '#',
      enableColumnFilter: false,
      enableSorting: false
    },
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      accessorKey: 'brandName',
      header: 'Brand Name'
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      accessorKey: 'phone',
      header: 'Phone'
    },
    {
      accessorKey: 'lastLoginAt',
      header: 'Last Login'
    },
    {
      accessorKey: 'createdAt',
      header: 'Created'
    },
    {
      accessorKey: 'isActive',
      header: 'isActive'
    },
    {
      accessorKey: 'action',
      header: 'Action',
      enableColumnFilter: false,
      enableSorting: false
    }
  ];
  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link disable">Brand</Typography>
            <Typography className="home-link current">
              View Brand Staff
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">View Brand Staff</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <MaterialReactTable
          columns={columns}
          data={updateData}
          enablePagination
          defaultColumn={{
            minSize: 30,
            maxSize: 400,
            size: 50
          }}
          manualFiltering
          manualPagination
          manualSorting
          onColumnFiltersChange={setColumnFilters}
          onGlobalFilterChange={setGlobalFilter}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          rowCount={rowCount}
          state={{
            columnFilters,
            globalFilter,
            pagination,
            sorting
          }}
          enableStickyHeader
          muiTableHeadProps={{ sx: { zIndex: 1 } }}
          muiTableContainerProps={{ sx: { maxHeight: '50vh' } }}
        />
      </Box>
      <Dialog open={openPwd} onClose={handlePwdDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Change Password</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initPwd}
            enableReinitialize
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .min(6)
                .max(255)
                .required('Password is required'),
              confirmPwd: Yup.string()
                .min(6)
                .max(255)
                .oneOf(
                  [Yup.ref('password'), null],
                  'Confirm password must be the same as Password'
                )
                .required('Confirm Password is required')
            })}
            onSubmit={async (values, actions) => {
              DFnewLogger(values);
              changeBrandPwd(values);
              handlePwdDialog();
              actions.resetForm();
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
                      error={Boolean(touched.email && errors.email)}
                    >
                      <InputLabel htmlFor="outlined-email">Email</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Email *"
                        id="outlined-email"
                        disabled
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText id="helper-text" error>
                          {errors.email}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                    >
                      <InputLabel htmlFor="outlined-adornment-password-signup">
                        Password <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Password *"
                        id="outlined-adornment-password-signup"
                        autoComplete=""
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                          changePassword(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {touched.password && errors.password && (
                        <FormHelperText
                          id="standard-weight-helper-text-password-signup"
                          error
                        >
                          {errors.password}
                        </FormHelperText>
                      )}
                    </FormControl>
                    {strengthPassword !== 0 && (
                      <FormControl fullWidth>
                        <Box sx={{ mb: 2 }}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item>
                              <Box
                                style={{
                                  backgroundColor: levelPassword?.color
                                }}
                                sx={{
                                  width: 85,
                                  height: 8,
                                  borderRadius: '7px'
                                }}
                              />
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                {levelPassword?.label}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </FormControl>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.confirmPwd && errors.confirmPwd)}
                    >
                      <InputLabel htmlFor="confirm-password">
                        Confirm Password <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Confirm Password *"
                        id="confirm-password"
                        autoComplete=""
                        type={showConfirmPwd ? 'text' : 'password'}
                        value={values.confirmPwd}
                        name="confirmPwd"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                          changeConfirmPwd(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPwd}
                              onMouseDown={handleMouseDownConfirmPwd}
                              edge="end"
                              size="large"
                            >
                              {showConfirmPwd ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {touched.confirmPwd && errors.confirmPwd && (
                        <FormHelperText id="helper-confirm-password" error>
                          {errors.confirmPwd}
                        </FormHelperText>
                      )}
                    </FormControl>
                    {strengthConfirmPwd !== 0 && (
                      <FormControl fullWidth>
                        <Box sx={{ mb: 2 }}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item>
                              <Box
                                style={{
                                  backgroundColor: levelConfirmPwd?.color
                                }}
                                sx={{
                                  width: 85,
                                  height: 8,
                                  borderRadius: '7px'
                                }}
                              />
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                {levelConfirmPwd?.label}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </FormControl>
                    )}
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button
                      key="cancel"
                      className="account-no-btn"
                      onClick={handlePwdDialog}
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
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Change Brand Info</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initEdit}
            validationSchema={Yup.object().shape({
              firstName: Yup.string()
                .max(30)
                .required('First Name is required'),
              lastName: Yup.string().max(30).required('Last Name is required'),
              brandName: Yup.string()
                .max(30)
                .required('Brand Name is required'),
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              phone: Yup.string()
                .phone('Invalid Phone Number')
                .required('Phone Number is required')
            })}
            onSubmit={async (values, actions) => {
              DFnewLogger(values);
              dispatch(editBrand(values));
              handleEditDialog();
              actions.resetForm();
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
                    <FormControl
                      fullWidth
                      error={Boolean(touched.firstName && errors.firstName)}
                    >
                      <InputLabel>
                        First Name <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="First Name *"
                        value={values.firstName}
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.firstName && errors.firstName && (
                        <FormHelperText id="helper-text" error>
                          {errors.firstName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.lastName && errors.lastName)}
                    >
                      <InputLabel>
                        Last Name <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Last Name *"
                        value={values.lastName}
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.lastName && errors.lastName && (
                        <FormHelperText id="helper-text" error>
                          {errors.lastName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                    >
                      <InputLabel>Email</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Email"
                        id="outlined-email"
                        disabled
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText id="helper-text" error>
                          {errors.email}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.phone && errors.phone)}
                    >
                      <InputLabel>
                        Phone <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Phone *"
                        value={values.phone}
                        type="number"
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.phone && errors.phone && (
                        <FormHelperText error>{errors.phone}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextareaAutosize
                        placeholder="Address"
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
                        value={values.address}
                        name="address"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.brandName && errors.brandName)}
                    >
                      <InputLabel>
                        Brand Name <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Brand Name *"
                        value={values.brandName}
                        name="brandName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.brandName && errors.brandName && (
                        <FormHelperText id="helper-text" error>
                          {errors.brandName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button
                      key="cancel"
                      className="account-no-btn"
                      onClick={handleEditDialog}
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
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={handleDeleteDialog}>
        <DialogTitle>
          <Typography className="dialog-title">
            Are you sure to delete?
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button
            key="cancel"
            className="account-no-btn"
            onClick={handleDeleteDialog}
          >
            Cancel
          </Button>
          <Button
            key="submit"
            className="account-delete-btn"
            onClick={() => {
              if (tableData.length === 1 && rowCount !== 1) {
                setPagination({
                  pageIndex: pagination.pageIndex - 1,
                  pageSize: pagination.pageSize
                });
              }
              dispatch(
                deleteBrand(
                  { _id: id },
                  {
                    start:
                      tableData.length === 1 && rowCount !== 1
                        ? (pagination.pageIndex - 1) * pagination.pageSize
                        : pagination.pageIndex * pagination.pageSize,
                    size: pagination.pageSize,
                    filters: JSON.stringify(columnFilters ?? []),
                    globalFilter: globalFilter ?? '',
                    sorting: JSON.stringify(sorting ?? [])
                  }
                )
              );
              handleDeleteDialog();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openToggle} onClose={handleToggleDialog}>
        <DialogTitle>
          <Typography className="dialog-title">
            Are you sure to {toggleMsg}activate?
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button className="account-no-btn" onClick={handleToggleDialog}>
            Cancel
          </Button>
          <Button
            className="account-delete-btn"
            onClick={() => {
              handleToggleDialog();
              dispatch(toggleBrandActive({ _id: id }));
            }}
          >
            {FirstUpper(toggleMsg)}activate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewBrand;
