import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Tooltip,
  Paper,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Breadcrumbs,
  Dialog,
  DialogTitle,
  DialogActions
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import {
  faDashboard,
  faEdit,
  faPlus,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MaterialReactTable from 'material-react-table';

import DFnewLogger from 'utils/DFnewLogger';
import {
  addProductCategory,
  deleteProductCategory,
  editProductCategory,
  getProductCategory
} from 'actions/invProductCategory';

const ProductCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [initVal, setInitVal] = useState({
    category: '',
    prodName: '',
    note: ''
  });
  const [delId, setDelId] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };
  useEffect(() => {
    dispatch(
      getProductCategory({
        start: pagination.pageIndex * pagination.pageSize,
        size: pagination.pageSize,
        filters: JSON.stringify(columnFilters ?? []),
        globalFilter: globalFilter ?? '',
        sorting: JSON.stringify(sorting ?? [])
      })
    );
  }, [dispatch, columnFilters, globalFilter, sorting, pagination]);
  const { tableData, rowCount } = useSelector(
    (state) => state.invProductCategory
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
          <Tooltip title="Add" arrow>
            <Button
              className="admin-table-btn password"
              onClick={() =>
                navigate(
                  `/dfinventory/manage-category/product-sub-category/${item._id}`
                )
              }
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Tooltip>
          <Tooltip title="Edit" arrow>
            <Button
              className="admin-table-btn edit"
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
        categoryName: `${item.category} - ${item.prodName}`,
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
      accessorKey: 'categoryName',
      header: 'Catetory Name'
    },
    {
      accessorKey: 'note',
      header: 'Note'
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
            <Typography className="home-link disable">
              Manage Category
            </Typography>
            <Typography className="home-link current">
              Product Category
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Product Category</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            category: '',
            prodName: '',
            note: ''
          }}
          validationSchema={Yup.object().shape({
            category: Yup.string()
              .max(30)
              .required('ProductCategory is required'),
            prodName: Yup.string().max(30).required('Product Name is required'),
            note: Yup.string().required('Note is required')
          })}
          onSubmit={async (values, actions) => {
            DFnewLogger(values);
            dispatch(
              addProductCategory(values, {
                start: pagination.pageIndex * pagination.pageSize,
                size: pagination.pageSize,
                filters: JSON.stringify(columnFilters ?? []),
                globalFilter: globalFilter ?? '',
                sorting: JSON.stringify(sorting ?? [])
              })
            );
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
                  <Typography color="#ff0000">
                    All (*) fields are mandatory
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.category && errors.category)}
                  >
                    <InputLabel>
                      Product Category <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Product Category *"
                      value={values.category}
                      name="category"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.category && errors.category && (
                      <FormHelperText id="helper-text" error>
                        {errors.category}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.prodName && errors.prodName)}
                  >
                    <InputLabel>
                      Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Name *"
                      value={values.prodName}
                      name="prodName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.prodName && errors.prodName && (
                      <FormHelperText id="helper-text" error>
                        {errors.prodName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.note && errors.note)}
                  >
                    <InputLabel>
                      Note <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Note *"
                      value={values.note}
                      name="note"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.note && errors.note && (
                      <FormHelperText id="helper-text" error>
                        {errors.note}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} />
                <Grid item xs={12} sm={6}>
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
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">
            Edit Product Category
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initVal}
            enableReinitialize
            validationSchema={Yup.object().shape({
              category: Yup.string()
                .max(30)
                .required('ProductCategory is required'),
              prodName: Yup.string()
                .max(30)
                .required('Product Name is required'),
              note: Yup.string().max(30).required('Note is required')
            })}
            onSubmit={async (values, actions) => {
              DFnewLogger(values);
              dispatch(editProductCategory(values));
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
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.category && errors.category)}
                    >
                      <InputLabel>
                        Product Category <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Product Category *"
                        value={values.category}
                        name="category"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.category && errors.category && (
                        <FormHelperText id="helper-text" error>
                          {errors.category}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.prodName && errors.prodName)}
                    >
                      <InputLabel>
                        Name <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Name *"
                        value={values.prodName}
                        name="prodName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.prodName && errors.prodName && (
                        <FormHelperText id="helper-text" error>
                          {errors.prodName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.note && errors.note)}
                    >
                      <InputLabel>
                        Note <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Note *"
                        value={values.note}
                        name="note"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.note && errors.note && (
                        <FormHelperText id="helper-text" error>
                          {errors.note}
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
                deleteProductCategory(
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

export default ProductCategory;
