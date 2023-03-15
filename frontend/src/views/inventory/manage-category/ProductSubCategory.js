import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  Select,
  MenuItem,
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
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MaterialReactTable from 'material-react-table';

import DFnewLogger from 'utils/DFnewLogger';
import {
  getProductCategories,
  getProdSubCategory,
  addProdSubCategory,
  editProdSubCategory,
  deleteProdSubCategory
} from 'actions/invProdSubCategory';

const ProductSubCategory = () => {
  const { id } = useParams();
  console.log(id);
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
    category: '--',
    subCategoryRack: '',
    rackName: '',
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
    dispatch(getProductCategories());
    dispatch(
      getProdSubCategory({
        start: pagination.pageIndex * pagination.pageSize,
        size: pagination.pageSize,
        filters: JSON.stringify(columnFilters ?? []),
        globalFilter: globalFilter ?? '',
        sorting: JSON.stringify(sorting ?? [])
      })
    );
  }, [dispatch, columnFilters, globalFilter, sorting, pagination]);
  const { prodCategories, tableData, rowCount } = useSelector(
    (state) => state.invProdSubCategory
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
              className="admin-table-btn edit"
              onClick={() => {
                setInitVal({
                  _id: item._id,
                  category: item.prodCategoryId,
                  subCategoryRack: item.subCategoryRack,
                  rackName: item.rackName,
                  note: item.note
                });
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
        categoryName: `${item.category}-${item.prodName}`,
        name: `${item.subCategoryRack} - ${item.rackName}`,
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
      accessorKey: 'name',
      header: 'Name'
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
  const selectProps = {
    PaperProps: {
      style: {
        maxHeight: 360,
        width: 220
      }
    }
  };
  const categoryType = [
    'A1-WOMEN TOP',
    'A2-WOMEN DRESS',
    'A3-WOMEN JUMPSUIT',
    'A4-WOMEN ACTIVEWEAR',
    'A5-WOMEN SHORTS',
    'A6-WOMEN SKIRTS',
    'A7-WOMEN JEANS',
    'A8-WOMEN PANTS',
    'A9-WOMEN SWEATERS',
    'A10-WOMEN JACKETS',
    'A11-WOMEN HOODIES',
    'A12-WOMEN SWEAT SHIRTS',
    'A13-WOMEN EXTRAS',
    'A14-WOMEN ACCESSORIES',
    'B1-MEN T-SHIRT',
    'B2-MEN SHIRT',
    'B3-MEN DRESS PANT',
    'B4-MEN CASUAL PANT',
    'B5-MEN JEANS',
    'B6-MEN SHORTS',
    'B7-MEN ACITVEWEARS',
    'B8-MEN SWEATER',
    'B9-MEN SWEAT SHIRT',
    'B10-MEN HOODIES',
    'B11-MEN JACKET',
    'B12-MEN EXTRAS',
    'C1-BOY T-SHIRT',
    'C2-BOY SHIRT',
    'C3-BOY PANT',
    'C4-BOY JEANS',
    'C5-BOY SHORTS',
    'C6-BOY SWEATER',
    'C7-BOY SWEET SHIRTS',
    'C8-BOY HOODIES',
    'C9-BOY SHOES',
    'C10-BOY ACCESSORIES',
    'C11-BOY JACKET',
    'D1-GIRLS T-SHIRT',
    'D8-GIRLS SWEAT SHIRT AND HOODIES',
    'D9-GIRLS ACCESSORIES',
    'D10-GIRLS TSHIRT',
    'D11-GIRLS ACTIVE WEAR',
    'K2-KIDS BOY JEANS',
    'M2-MALE'
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
              Product Subcategory
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Product Subcategory</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            category: id ? id : '--',
            subCategoryRack: '',
            rackName: '',
            note: ''
          }}
          enableReinitialize
          validationSchema={Yup.object().shape({
            category: Yup.string().min(0).required('Please select category'),
            subCategoryRack: Yup.string()
              .min(0)
              .required('Product category is required'),
            rackName: Yup.string().min(0).required('Name is required'),
            note: Yup.string().min(0).required('Note is required')
          })}
          onSubmit={async (values, actions) => {
            DFnewLogger(values);
            dispatch(
              addProdSubCategory(values, {
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
                <Grid item xs={12} sm={7}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.category && errors.category)}
                  >
                    <InputLabel>
                      Category
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      size="small"
                      label="Category *"
                      value={values.category}
                      name="category"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      MenuProps={selectProps}
                    >
                      {prodCategories?.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.value}
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
                <Grid item xs={12} sm={7}>
                  <FormControl
                    fullWidth
                    error={Boolean(
                      touched.subCategoryRack && errors.subCategoryRack
                    )}
                  >
                    <InputLabel>
                      Product SubCategory{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Product SubCategory *"
                      value={values.subCategoryRack}
                      name="subCategoryRack"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.subCategoryRack && errors.subCategoryRack && (
                      <FormHelperText id="helper-text" error>
                        {errors.subCategoryRack}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.rackName && errors.rackName)}
                  >
                    <InputLabel>
                      Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Name *"
                      value={values.rackName}
                      name="rackName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.rackName && errors.rackName && (
                      <FormHelperText id="helper-text" error>
                        {errors.rackName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={7}>
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
            Edit Product Subcategory
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initVal}
            enableReinitialize
            validationSchema={Yup.object().shape({
              category: Yup.string().min(0).required('Please select category'),
              subCategoryRack: Yup.string()
                .min(0)
                .required('Product category is required'),
              rackName: Yup.string().min(0).required('Name is required'),
              note: Yup.string().min(0).required('Note is required')
            })}
            onSubmit={async (values, actions) => {
              DFnewLogger(values);
              dispatch(editProdSubCategory(values));
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
                        Category
                        <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Select
                        size="small"
                        label="Category *"
                        value={values.category}
                        name="category"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        MenuProps={selectProps}
                      >
                        {prodCategories.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.value}
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
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(
                        touched.subCategoryRack && errors.subCategoryRack
                      )}
                    >
                      <InputLabel>
                        Product Subcategory{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Product Subcategory *"
                        value={values.subCategoryRack}
                        name="subCategoryRack"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.subCategoryRack && errors.subCategoryRack && (
                        <FormHelperText id="helper-text" error>
                          {errors.subCategoryRack}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.rackName && errors.rackName)}
                    >
                      <InputLabel>
                        Name <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Name *"
                        value={values.rackName}
                        name="rackName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.rackName && errors.rackName && (
                        <FormHelperText id="helper-text" error>
                          {errors.rackName}
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
                deleteProdSubCategory(
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

export default ProductSubCategory;
