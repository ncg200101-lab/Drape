import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  faPlus,
  faMinus,
  faEdit,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Tooltip,
  Select,
  MenuItem,
  TextareaAutosize,
  Breadcrumbs,
  Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faker } from '@faker-js/faker';
import 'yup-phone';
import { Modal } from 'antd';
import MaterialReactTable from 'material-react-table';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import ImageUpload from 'views/client/component/profile/ImageUpload';
import {
  addProduct,
  editProduct,
  addStock,
  deleteProduct,
  getProduct,
  getProductCategory,
  manualDeduct
} from 'actions/splProduct';

const Vote = GenS3Link('landing/images/client/post/vote');

const ManageProduct = () => {
  const dispatch = useDispatch();
  //table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [initVal, setInitVal] = useState({
    name: '',
    category: '',
    supProductImgUrl: '',
    description: '',
    quantity: '',
    price: '',
    usedAmount: '',
    supplierName: '',
    supplierAddress: '',
    supplierEmail: '',
    supplierPhone: '',
    currentStock: '',
    dynamicDeduct: ''
  });
  const [initItem, setInitItem] = useState({
    _id: '',
    count: ''
  });
  const [maxDeduct, setMaxDeduct] = useState(0);
  const [delId, setDelId] = useState('');
  const [openPlus, setOpenPlus] = useState(false);
  const [openMinus, setOpenMinus] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handlePlusDialog = () => {
    setOpenPlus(!openPlus);
  };
  const handleMinusDialog = () => {
    setOpenMinus(!openMinus);
  };
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };

  useEffect(() => {
    dispatch(getProductCategory());
    dispatch(
      getProduct({
        start: pagination.pageIndex * pagination.pageSize,
        size: pagination.pageSize,
        filters: JSON.stringify(columnFilters ?? []),
        globalFilter: globalFilter ?? '',
        sorting: JSON.stringify(sorting ?? [])
      })
    );
  }, []);
  const { tableData, rowCount, prodCategories } = useSelector(
    (state) => state.splProduct
  );
  let updateData = [];
  let rowNum = pagination.pageIndex * pagination.pageSize;
  if (tableData.length) {
    updateData = tableData.map((item, index) => {
      const action_btn = (
        <div
          key={index}
          style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}
        >
          <Tooltip title="Edit" arrow>
            <Button
              className="admin-table-btn password"
              onClick={() => {
                setInitItem({
                  _id: item._id,
                  count: ''
                });
                handlePlusDialog();
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Tooltip>
          <Tooltip title="Edit" arrow>
            <Button
              className="admin-table-btn edit"
              onClick={() => {
                setInitItem({
                  _id: item._id,
                  count: ''
                });
                setMaxDeduct(item.currentStock);
                handleMinusDialog();
              }}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          </Tooltip>
          <Tooltip title="Edit" arrow>
            <Button
              className="admin-table-btn deactive"
              onClick={() => {
                setInitVal(item);
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
                setDelId(item._id);
                handleDeleteDialog();
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </Tooltip>
        </div>
      );
      rowNum++;
      return {
        ...item,
        no: rowNum,
        supProductImgUrl: (
          <DFnewImgTag
            src={`${item.supProductImgUrl}`}
            fallback={`${item.supProductImgUrl}`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '74px' }}
            alt="Drape Fit Image"
          />
        ),
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
      accessorKey: 'supProductImgUrl',
      header: 'Image'
    },
    {
      accessorKey: 'price',
      header: 'Price'
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity'
    },
    {
      accessorKey: 'usedAmount',
      header: 'Used'
    },
    {
      accessorKey: 'currentStock',
      header: 'In Stock'
    },
    {
      accessorKey: 'dynamicDeduct',
      header: 'Deduct'
    },
    {
      accessorKey: 'supplierName',
      header: 'Supplier Name'
    },
    {
      accessorKey: 'supplierEmail',
      header: 'Supplier Email'
    },
    {
      accessorKey: 'supplierPhone',
      header: 'Supplier Phone'
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
            <Link to="/dfsupplier" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link current">
              Manage Supplier Product
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Add Supplier Product</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            name: '',
            category: '',
            supProductImgUrl: '',
            description: '',
            quantity: '',
            price: '',
            supplierName: '',
            supplierAddress: '',
            supplierEmail: '',
            supplierPhone: '',
            dynamicDeduct: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().min(3).max(30).required('Name is required'),
            category: Yup.string().required('Please select catetory'),
            supProductImgUrl: Yup.string().required('Please upload image'),
            quantity: Yup.number().min(0).required('Please input quantity'),
            price: Yup.number().min(0).required('Please input price'),
            supplierName: Yup.string()
              .min(3)
              .max(30)
              .required('Please input supplier name'),
            supplierAddress: Yup.string()
              .min(3)
              .max(30)
              .required('Please input supplier address'),
            supplierEmail: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Please input supplier email'),
            supplierPhone: Yup.string().phone('Phone Number is invalid')
            // dynamicDeduct: Yup.number().required('Please input dynamic deduct')
          })}
          onSubmit={async (values, actions) => {
            DFnewLogger(values);
            dispatch(
              addProduct(values, {
                start: pagination.pageIndex * pagination.pageSize,
                size: pagination.pageSize,
                filters: JSON.stringify(columnFilters ?? []),
                globalFilter: globalFilter ?? '',
                sorting: JSON.stringify(sorting ?? [])
              })
            );
            // actions.resetForm();
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
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  >
                    <InputLabel>Name</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Name"
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
                    error={Boolean(touched.category && errors.category)}
                  >
                    <InputLabel>Category</InputLabel>
                    <Select
                      size="small"
                      label="Category"
                      value={values.category}
                      name="category"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      {prodCategories.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.category && errors.category && (
                      <FormHelperText
                        id="standard-weight-helper-text--signup"
                        error
                      >
                        {errors.category}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box width="200px">
                    <ImageUpload
                      arg="supProductImgUrl"
                      value={values.supProductImgUrl}
                      setFieldValue={setFieldValue}
                    />
                    {touched.supProductImgUrl && errors.supProductImgUrl && (
                      <FormHelperText
                        id="standard-weight-helper-text--signup"
                        error
                      >
                        {errors.supProductImgUrl}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextareaAutosize
                      placeholder="Please enter description"
                      style={{
                        minWidth: '100%',
                        maxWidth: '100%',
                        minHeight: '170px',
                        padding: '15px',
                        borderColor: '#ccc',
                        borderRadius: '12px',
                        fontSize: '14px'
                      }}
                      value={values.description}
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.quantity && errors.quantity)}
                  >
                    <InputLabel>Quantity</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Quantity"
                      type="number"
                      value={values.quantity}
                      name="quantity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.quantity && errors.quantity && (
                      <FormHelperText id="helper-text" error>
                        {errors.quantity}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.price && errors.price)}
                  >
                    <InputLabel>Price</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Price"
                      type="number"
                      value={values.price}
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
                    error={Boolean(touched.supplierName && errors.supplierName)}
                  >
                    <InputLabel>Supplier Name</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Supplier Name"
                      value={values.supplierName}
                      name="supplierName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.supplierName && errors.supplierName && (
                      <FormHelperText id="helper-text" error>
                        {errors.supplierName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(
                      touched.supplierAddress && errors.supplierAddress
                    )}
                  >
                    <InputLabel>Supplier Address</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Supplier Address"
                      value={values.supplierAddress}
                      name="supplierAddress"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.supplierAddress && errors.supplierAddress && (
                      <FormHelperText id="helper-text" error>
                        {errors.supplierAddress}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(
                      touched.supplierEmail && errors.supplierEmail
                    )}
                  >
                    <InputLabel>Supplier Email</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Supplier Email"
                      value={values.supplierEmail}
                      name="supplierEmail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.supplierEmail && errors.supplierEmail && (
                      <FormHelperText id="helper-text" error>
                        {errors.supplierEmail}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(
                      touched.supplierPhone && errors.supplierPhone
                    )}
                  >
                    <InputLabel>Supplier Phone</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Supplier Phone"
                      value={values.supplierPhone}
                      name="supplierPhone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.supplierPhone && errors.supplierPhone && (
                      <FormHelperText id="helper-text" error>
                        {errors.supplierPhone}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                {prodCategories.map((item, index) =>
                  item.name === values.category ? (
                    item.isDefault ? (
                      <Grid item xs={12} sm={6} key={index}>
                        <FormControl
                          fullWidth
                          error={Boolean(
                            touched.dynamicDeduct && errors.dynamicDeduct
                          )}
                        >
                          <InputLabel>Dynamic Deduct</InputLabel>
                          <OutlinedInput
                            size="small"
                            label="Dynamic Deduct"
                            type="number"
                            value={values.dynamicDeduct}
                            name="dynamicDeduct"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.dynamicDeduct && errors.dynamicDeduct && (
                            <FormHelperText id="helper-text" error>
                              {errors.dynamicDeduct}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )
                )}
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
        <MaterialReactTable
          columns={columns}
          data={updateData}
          enablePagination
          defaultColumn={{
            minSize: 30,
            maxSize: 400,
            size: 50
          }}
          positionPagination="both"
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
        />
      </Box>
      <Dialog open={openPlus} onClose={handlePlusDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Add More Stocks</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initItem}
            validationSchema={Yup.object().shape({
              count: Yup.number().min(0).required('Count is required')
            })}
            onSubmit={async (values, actions) => {
              DFnewLogger(values);
              dispatch(
                addStock(values, {
                  start: pagination.pageIndex * pagination.pageSize,
                  size: pagination.pageSize,
                  filters: JSON.stringify(columnFilters ?? []),
                  globalFilter: globalFilter ?? '',
                  sorting: JSON.stringify(sorting ?? [])
                })
              );
              handlePlusDialog();
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
                      error={Boolean(touched.count && errors.count)}
                    >
                      <InputLabel>
                        Count <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Count *"
                        value={values.count}
                        name="count"
                        type="number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.count && errors.count && (
                        <FormHelperText id="helper-text" error>
                          {errors.count}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button
                      key="cancel"
                      className="account-no-btn"
                      onClick={handlePlusDialog}
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
      <Dialog open={openMinus} onClose={handleMinusDialog}>
        <DialogTitle>
          <Typography className="dialog-title">
            Deduct Stock Manually
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initItem}
            validationSchema={Yup.object().shape({
              count: Yup.number()
                .min(0)
                .max(maxDeduct)
                .required('Count is required')
            })}
            onSubmit={async (values, actions) => {
              DFnewLogger(values);
              dispatch(
                manualDeduct(values, {
                  start: pagination.pageIndex * pagination.pageSize,
                  size: pagination.pageSize,
                  filters: JSON.stringify(columnFilters ?? []),
                  globalFilter: globalFilter ?? '',
                  sorting: JSON.stringify(sorting ?? [])
                })
              );
              handleMinusDialog();
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
                      error={Boolean(touched.count && errors.count)}
                    >
                      <InputLabel>
                        Count <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="count *"
                        value={values.count}
                        name="count"
                        type="number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.count && errors.count && (
                        <FormHelperText id="helper-text" error>
                          {errors.count}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button
                      key="cancel"
                      className="account-no-btn"
                      onClick={handleMinusDialog}
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
          <Typography className="dialog-title">
            Edit Product Category
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initVal}
            validationSchema={Yup.object().shape({
              name: Yup.string().min(3).max(30).required('Name is required'),
              category: Yup.string().required('Please select catetory'),
              supProductImgUrl: Yup.string().required('Please upload image'),
              quantity: Yup.number().min(0).required('Please input quantity'),
              price: Yup.number().min(0).required('Please input price'),
              supplierName: Yup.string()
                .min(3)
                .max(30)
                .required('Please input supplier name'),
              supplierAddress: Yup.string()
                .min(3)
                .max(30)
                .required('Please input supplier address'),
              supplierEmail: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Please input supplier email'),
              supplierPhone: Yup.string().phone('Phone Number is invalid')
              // dynamicDeduct: Yup.number().required('Please input dynamic deduct')
            })}
            onSubmit={async (values, actions) => {
              DFnewLogger(values);
              dispatch(
                editProduct(values, {
                  start: pagination.pageIndex * pagination.pageSize,
                  size: pagination.pageSize,
                  filters: JSON.stringify(columnFilters ?? []),
                  globalFilter: globalFilter ?? '',
                  sorting: JSON.stringify(sorting ?? [])
                })
              );
              actions.resetForm();
              handleEditDialog();
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
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.name && errors.name)}
                    >
                      <InputLabel>Name</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Name"
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
                      error={Boolean(touched.category && errors.category)}
                    >
                      <InputLabel>Category</InputLabel>
                      <Select
                        size="small"
                        disabled
                        label="Category"
                        value={values.category}
                        name="category"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        {prodCategories.map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.category && errors.category && (
                        <FormHelperText
                          id="standard-weight-helper-text--signup"
                          error
                        >
                          {errors.category}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box width="200px">
                      <ImageUpload
                        arg="supProductImgUrl"
                        value={values.supProductImgUrl}
                        setFieldValue={setFieldValue}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextareaAutosize
                        placeholder="Please enter description"
                        style={{
                          minWidth: '100%',
                          maxWidth: '100%',
                          minHeight: '170px',
                          padding: '15px',
                          borderColor: '#ccc',
                          borderRadius: '12px',
                          fontSize: '14px'
                        }}
                        value={values.description}
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.price && errors.price)}
                    >
                      <InputLabel>Price</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Price"
                        type="number"
                        value={values.price}
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
                      error={Boolean(
                        touched.supplierName && errors.supplierName
                      )}
                    >
                      <InputLabel>Supplier Name</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Supplier Name"
                        value={values.supplierName}
                        name="supplierName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.supplierName && errors.supplierName && (
                        <FormHelperText id="helper-text" error>
                          {errors.supplierName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(
                        touched.supplierAddress && errors.supplierAddress
                      )}
                    >
                      <InputLabel>Supplier Address</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Supplier Address"
                        value={values.supplierAddress}
                        name="supplierAddress"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.supplierAddress && errors.supplierAddress && (
                        <FormHelperText id="helper-text" error>
                          {errors.supplierAddress}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(
                        touched.supplierEmail && errors.supplierEmail
                      )}
                    >
                      <InputLabel>Supplier Email</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Supplier Email"
                        value={values.supplierEmail}
                        name="supplierEmail"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.supplierEmail && errors.supplierEmail && (
                        <FormHelperText id="helper-text" error>
                          {errors.supplierEmail}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(
                        touched.supplierPhone && errors.supplierPhone
                      )}
                    >
                      <InputLabel>Supplier Phone</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Supplier Phone"
                        value={values.supplierPhone}
                        name="supplierPhone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.supplierPhone && errors.supplierPhone && (
                        <FormHelperText id="helper-text" error>
                          {errors.supplierPhone}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  {prodCategories.map((item, index) =>
                    item.name === values.category ? (
                      item.isDefault ? (
                        <Grid item xs={12} sm={6} key={index}>
                          <FormControl
                            fullWidth
                            error={Boolean(
                              touched.dynamicDeduct && errors.dynamicDeduct
                            )}
                          >
                            <InputLabel>Dynamic Deduct</InputLabel>
                            <OutlinedInput
                              size="small"
                              label="Dynamic Deduct"
                              type="number"
                              value={values.dynamicDeduct}
                              name="dynamicDeduct"
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            {touched.dynamicDeduct && errors.dynamicDeduct && (
                              <FormHelperText id="helper-text" error>
                                {errors.dynamicDeduct}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )
                  )}
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(
                        touched.currentStock && errors.currentStock
                      )}
                    >
                      <InputLabel>Current in Stock</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Current in Stock"
                        type="number"
                        value={values.currentStock}
                        name="currentStock"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.currentStock && errors.currentStock && (
                        <FormHelperText id="helper-text" error>
                          {errors.currentStock}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.quantity && errors.quantity)}
                    >
                      <InputLabel>Quantity</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Quantity"
                        type="number"
                        disabled
                        value={values.usedAmount + values.currentStock}
                        name="quantity"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.quantity && errors.quantity && (
                        <FormHelperText id="helper-text" error>
                          {errors.quantity}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.usedAmount && errors.usedAmount)}
                    >
                      <InputLabel>Used</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="usedAmount"
                        type="number"
                        disabled
                        value={values.usedAmount}
                        name="usedAmount"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.usedAmount && errors.usedAmount && (
                        <FormHelperText id="helper-text" error>
                          {errors.usedAmount}
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
                deleteProduct(
                  { _id: delId },
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
    </>
  );
};

export default ManageProduct;
