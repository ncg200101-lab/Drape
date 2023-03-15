import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard,
  faEdit,
  faTrashCan,
  faListUl,
  faPrint,
  faEye,
  faCheck,
  faMultiply
} from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Typography,
  Tooltip,
  Button,
  FormControl,
  Breadcrumbs,
  Grid,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@mui/material';
import { faker } from '@faker-js/faker';
import Barcode from 'react-barcode';
import html2pdf from 'html2pdf.js';
import MaterialReactTable from 'material-react-table';

import DFnewLogger from 'utils/DFnewLogger';
import DFnewImgTag from 'utils/DFnewImgTag';
import GenFileName from 'utils/GenFileName';
import { SET_LOADING } from 'actions/types';
import { useDispatch, useSelector } from 'react-redux';
import { getProductCategories } from 'actions/invMenProduct';
import {
  deleteProduct,
  getIndividualProduct,
  getProductList,
  toggleProductActive
} from 'actions/invProductList';
import { FirstUpper } from 'utils/FirstUpper';

const GenStyleNo = (
  value = 'Product-All-2023asdfasdfasdfa0526-1',
  step = 0
) => {
  const newArr = value.split('-');
  return (
    `${newArr[2].slice(0, 5)}` +
    // `-` +
    `${newArr[2].slice(18, 23)}` +
    `-` +
    `${step + 1}`
  );
};
const ProductList = () => {
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
  const [id, setId] = useState('');
  const [toggleMsg, setToggleMsg] = useState('');
  const [openPrint, setOpenPrint] = useState(false);
  const handlePrintDialog = () => {
    setOpenPrint(!openPrint);
  };
  const [openView, setOpenView] = useState(false);
  const handleViewDialog = () => {
    setOpenView(!openView);
  };
  const [openDelete, setOpenDelete] = useState(false);
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };
  const [openToggle, setOpenToggle] = useState(false);
  const handleToggleDialog = () => {
    setOpenToggle(!openToggle);
  };
  const [itemData, setItemData] = useState({});
  const downloadPdf = async () => {
    try {
      dispatch({
        type: SET_LOADING
      });
      const element = document.getElementById('p-barcode');
      const opt = {
        margin: [10, 10, 10, 10],
        filename: GenFileName('barcode'),
        image: { type: 'jpeg', quality: 0.99 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
      };
      html2pdf()
        .from(element)
        .set(opt)
        .save()
        .then(() => {
          dispatch({ type: SET_LOADING });
        });
    } catch (e) {
      DFnewLogger(e);
    }
  };
  const [profile, setProfile] = useState('men');
  const [category, setCategory] = useState('--');
  const profileType = [
    { title: 'Men', value: 'men' },
    { title: 'Women', value: 'women' },
    { title: 'Boy Kids', value: 'boy' },
    { title: 'Girl Kids', value: 'girl' }
  ];
  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(
      getProductList({
        start: pagination.pageIndex * pagination.pageSize,
        size: pagination.pageSize,
        filters: JSON.stringify(columnFilters ?? []),
        globalFilter: globalFilter ?? '',
        sorting: JSON.stringify(sorting ?? []),
        profile: profile,
        categoryId: category
      })
    );
  }, [
    dispatch,
    columnFilters,
    globalFilter,
    sorting,
    pagination,
    profile,
    category
  ]);
  const { prodCategories } = useSelector((state) => state.invMenProduct);
  const { tableData, rowCount } = useSelector((state) => state.invProductList);
  let updateData = [];
  let rowNum = pagination.pageIndex * pagination.pageSize;
  if (tableData.length) {
    updateData = tableData.map((item, index) => {
      const action_btn = (
        <div key={index}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}
          >
            <Tooltip title="Details" arrow>
              <Link to="/dfinventory/product-list/individual">
                <Button
                  className="admin-table-btn edit"
                  onClick={() =>
                    dispatch(
                      getIndividualProduct({
                        id: item._id,
                        quantity: item.quantity
                      })
                    )
                  }
                >
                  <FontAwesomeIcon icon={faListUl} />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip title="Print" arrow>
              <Button
                className="admin-table-btn password"
                onClick={() => {
                  setItemData(item);
                  handlePrintDialog();
                }}
              >
                <FontAwesomeIcon icon={faPrint} />
              </Button>
            </Tooltip>
            <Tooltip title="OverView" arrow>
              <Button
                className="admin-table-btn deactive"
                onClick={() => {
                  setItemData(item);
                  handleViewDialog();
                }}
              >
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </Tooltip>
          </div>
          <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
            <Tooltip title="Edit" arrow>
              <Link to={`/dfinventory/edit-product/${profile}`}>
                <Button
                  className="admin-table-btn deactive"
                  onClick={() => {
                    dispatch(
                      getIndividualProduct({
                        id: item._id,
                        quantity: item.quantity
                      })
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              </Link>
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
        </div>
      );
      rowNum++;
      return {
        ...item,
        no: rowNum,
        productImage: (
          <DFnewImgTag
            src={`${item.productImage}`}
            fallback={`${item.productImage}`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '74px' }}
          />
        ),
        styleNo: `${item.styleNo ? item.styleNo : `Product-`}` + `1`,
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
      accessorKey: 'brandName',
      header: 'Brand Name'
    },
    {
      accessorKey: 'productName1',
      header: 'Product Name 1'
    },
    {
      accessorKey: 'productName2',
      header: 'Product Name 2'
    },
    {
      accessorKey: 'productImage',
      header: 'Product Image'
    },
    {
      accessorKey: 'sizeSelected',
      header: 'Size'
    },
    {
      accessorKey: 'colorName',
      header: 'Color'
    },
    {
      accessorKey: 'purchasePrice',
      header: 'Purchase Price'
    },
    {
      accessorKey: 'salePrice',
      header: 'Sale Price'
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity'
    },
    {
      accessorKey: 'styleNo',
      header: 'Style NO.'
    },
    {
      accessorKey: 'action',
      header: 'Action',
      enableColumnFilter: false,
      enableSorting: false
    }
  ];
  //-- for select component
  const selectProps = {
    PaperProps: {
      style: {
        maxHeight: 360,
        width: 220
      }
    }
  };

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link current">Product List</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Product List</Typography>
        </Grid>
      </Grid>
      <Box className="table-border container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography>
                  <strong>Profile</strong>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    value={profile}
                    name="profile"
                    onChange={(e) => setProfile(e.target.value)}
                    MenuProps={selectProps}
                  >
                    {profileType.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography>
                  <strong>Category</strong>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    value={category}
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                    MenuProps={selectProps}
                  >
                    {prodCategories.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
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
            />{' '}
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openPrint} onClose={handlePrintDialog} scroll="paper">
        <DialogTitle>
          <Typography className="dialog-title">Barcode Print</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Box id="p-barcode">
            {[...new Array(itemData.quantity)].map((item, index) => (
              <Box className="barcode-box" key={index}>
                <Typography className="barcode-name" align="center">
                  <b>{itemData.productName1}</b>
                </Typography>
                <Typography className="barcode-subname" align="center">
                  {itemData.productName2}
                </Typography>

                <Typography className="barcode-name border" align="left">
                  Size : <strong>{itemData.sizeSelected}</strong>
                  <span className="right">
                    Color : <strong>{itemData.colorName}</strong>
                  </span>
                </Typography>
                <div className="h-align-center">
                  <Barcode
                    value={GenStyleNo(itemData?.styleNo, index)}
                    height={18}
                    width={1.3}
                  />
                </div>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button className="account-no-btn" onClick={handlePrintDialog}>
            Cancel
          </Button>
          <Button
            className="account-yes-btn"
            onClick={() => {
              handlePrintDialog();
              downloadPdf();
            }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openView} onClose={handleViewDialog} scroll="paper">
        <DialogTitle>
          <Typography className="dialog-title">Product Details</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>
                What is your height:{' '}
                {/* <span>
                  {itemData.fromHeightFt} Ft, {itemData.fromHeightIn} In ~
                </span>
                <span>
                  {itemData.toHeightFt} Ft, {itemData.toHeightIn} In
                </span> */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                Best Fit for Weight:{' '}
                {/* <span>
                  {itemData.fromWeight} ~ {itemData.toWeight}
                </span> */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                Best Size Fit:{' '}
                {/* <span>
                  {itemData.bestSizeFit}
                </span> */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                Waist Size:{' '}
                {/* <span>
                  {itemData.waistSizeNum} / {itemData.waistSizeLabel}
                </span> */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                Shirt Size:{' '}
                {/* <span>
                  {itemData.shirtSizeNo} / {itemData.shirtSizeLabel}
                </span> */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                Shirt Size:{' '}
                {/* <span>
                  {itemData.bottomSizeNo}
                </span> */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                Inseam Size:{' '}
                {/* <span>
                  {itemData.inseamSizeNum}
                </span> */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                Shoe Size:{' '}
                {/* <span>
                  {itemData.shoeSizeNum} / {itemData.shoeSizeLabel}
                </span> */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                Better Body Shape:{' '}
                {/* <span>
                  {itemData.shoeSizeNum} / {itemData.shoeSizeLabel}
                </span> */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Better Body Shape: </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            className="account-yes-btn"
            onClick={() => {
              handleViewDialog();
            }}
          >
            Close
          </Button>
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
                deleteProduct({ _id: id }, profile, {
                  start:
                    tableData.length === 1 && rowCount !== 1
                      ? (pagination.pageIndex - 1) * pagination.pageSize
                      : pagination.pageIndex * pagination.pageSize,
                  size: pagination.pageSize,
                  filters: JSON.stringify(columnFilters ?? []),
                  globalFilter: globalFilter ?? '',
                  sorting: JSON.stringify(sorting ?? []),
                  profile: profile,
                  categoryId: category
                })
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
              dispatch(toggleProductActive({ _id: id }, profile));
            }}
          >
            {FirstUpper(toggleMsg)}activate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductList;
