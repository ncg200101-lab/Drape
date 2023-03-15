import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faPrint } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Typography,
  Tooltip,
  Button,
  Breadcrumbs,
  Grid,
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
import Table from 'ui-component/Table';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import { SET_LOADING } from 'actions/types';
import GenFileName from 'utils/GenFileName';

const Vote = GenS3Link('landing/images/client/post/vote');

const IndividualProduct = () => {
  const dispatch = useDispatch();
  //table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [barcodeData, setBarcodeData] = useState('');
  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };
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
  const { tableData, rowCount } = useSelector((state) => state.invProductList);
  let updateData = [];
  let rowNum = pagination.pageIndex * pagination.pageSize;
  let endNum = rowCount;
  if (rowCount > rowNum + pagination.pageSize) {
    endNum = rowNum + pagination.pageSize;
  } else {
    endNum = rowCount;
  }
  if (tableData.length) {
    for (let i = rowNum; i < endNum; i++) {
      updateData.push({
        ...tableData[0],
        no: i + 1,
        productImage: (
          <DFnewImgTag
            src={`${tableData[0].productImage}`}
            fallback={`${tableData[0].productImage}`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '74px' }}
          />
        ),
        barcode: (
          <Barcode
            value={`${
              tableData[0]._id.slice(0, 5) + tableData[0]._id.slice(18, 23)
            }-${i + 1}`}
            height={50}
            width={1}
          />
        ),
        action: (
          <Tooltip title="Print" arrow>
            <Button
              className="admin-table-btn password"
              onClick={() => {
                setBarcodeData(
                  `${
                    tableData[0]._id.slice(0, 5) +
                    tableData[0]._id.slice(18, 23)
                  }-${i + 1}`
                );
                handleDialog();
              }}
            >
              <FontAwesomeIcon icon={faPrint} />
            </Button>
          </Tooltip>
        )
      });
    }
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
      accessorKey: 'barcode',
      header: 'Barcode'
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
            <Link to="/dfinventory/product-list" className="home-link">
              Product List
            </Link>
            <Typography className="home-link current">
              Individual Product
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Individual Product</Typography>
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
      <Dialog open={openDialog} onClose={handleDialog} scroll="paper">
        <DialogTitle>
          <Typography className="dialog-title">Barcode Print</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Box id="p-barcode">
            <Box className="barcode-box">
              <Typography className="barcode-name" align="center">
                <b>{tableData[0].productName1}</b>
              </Typography>
              <Typography className="barcode-subname" align="center">
                {tableData[0].productName2}
              </Typography>

              <Typography className="barcode-name border" align="left">
                Size : <strong>{tableData[0].sizeSelected}</strong>
                <span className="right">
                  Color : <strong>{tableData[0].colorName}</strong>
                </span>
              </Typography>
              <div className="h-align-center">
                <Barcode value={barcodeData} height={18} width={1.3} />
              </div>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button className="account-no-btn" onClick={handleDialog}>
            Cancel
          </Button>
          <Button
            className="account-yes-btn"
            onClick={() => {
              handleDialog();
              downloadPdf();
            }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default IndividualProduct;
