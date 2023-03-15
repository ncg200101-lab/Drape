import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  TextareaAutosize,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Breadcrumbs
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard,
  faEdit,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import MaterialReactTable from 'material-react-table';

import { addColor, getColor, editColor, deleteColor } from 'actions/invColor';
import DFnewLogger from 'utils/DFnewLogger';

const ManageColor = () => {
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
    name: ''
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
      getColor({
        start: pagination.pageIndex * pagination.pageSize,
        size: pagination.pageSize,
        filters: JSON.stringify(columnFilters ?? []),
        globalFilter: globalFilter ?? '',
        sorting: JSON.stringify(sorting ?? [])
      })
    );
  }, [dispatch, columnFilters, globalFilter, sorting, pagination]);
  const { tableData, rowCount } = useSelector((state) => state.invColor);
  let updateData = [];
  let rowNum = pagination.pageIndex * pagination.pageSize;
  if (tableData.length) {
    updateData = tableData.map((item, index) => {
      const action_btn = (
        <div key={index}>
          <Tooltip title="Edit" arrow>
            <Button
              className="admin-table-btn edit margin"
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
              className="admin-table-btn delete margin"
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
      header: 'Name',
      muiTableHeadCellProps: {
        align: 'right'
      },
      muiTableBodyCellProps: {
        align: 'right'
      }
    },
    {
      accessorKey: 'action',
      header: 'Action',
      enableColumnFilter: false,
      enableSorting: false,
      muiTableHeadCellProps: {
        align: 'right'
      },
      muiTableBodyCellProps: {
        align: 'right'
      }
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
            <Typography className="home-link current">Manage Color</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Manage Color</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{ name: '' }}
          enableReinitialize
          validationSchema={Yup.object().shape({
            name: Yup.string().max(30).required('Name is required')
          })}
          onSubmit={async (values, actions) => {
            DFnewLogger(values);
            dispatch(
              addColor(values, {
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
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  >
                    <InputLabel>
                      Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Name *"
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
                <Grid item xs={12} sm={9}>
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
          <Typography className="dialog-title">Edit Color Name</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initVal}
            enableReinitialize
            validationSchema={Yup.object().shape({
              name: Yup.string().max(30).required('Name is required')
            })}
            onSubmit={async (values, actions) => {
              DFnewLogger(values);
              dispatch(editColor(values));
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
                deleteColor(
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

export default ManageColor;
