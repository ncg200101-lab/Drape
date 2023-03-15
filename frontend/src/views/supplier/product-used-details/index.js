import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Grid, Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import MaterialReactTable from 'material-react-table';

import { getUsedDetails } from 'actions/splUsedDetails';

const columns = [
  {
    accessorKey: 'product',
    header: 'Product'
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },
  {
    accessorKey: 'orderID',
    header: 'Order ID'
  },
  {
    accessorKey: 'date',
    header: 'Date'
  }
];

const ProductUsedDetails = () => {
  const dispatch = useDispatch();
  const today = new Date();
  const [startDate, setStartDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [endDate, setEndDate] = useState(new Date());
  //table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  useEffect(() => {
    dispatch(
      getUsedDetails({
        start: pagination.pageIndex * pagination.pageSize,
        size: pagination.pageSize,
        filters: JSON.stringify(columnFilters ?? []),
        globalFilter: globalFilter ?? '',
        sorting: JSON.stringify(sorting ?? []),
        startDate: startDate,
        endDate: endDate
      })
    );
  }, [
    dispatch,
    columnFilters,
    globalFilter,
    sorting,
    pagination,
    startDate,
    endDate
  ]);
  const { tableData, rowCount } = useSelector((state) => state.influencer);
  let updateData = [];
  let rowNum = pagination.pageIndex * pagination.pageSize;
  if (tableData.length) {
    updateData = tableData.map((item, index) => {
      rowNum++;
      return {
        ...item,
        no: rowNum
      };
    });
  }

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfsupplier" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link current">
              Supplier Product Used Details
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">
            Supplier Product Used Details
          </Typography>
        </Grid>
      </Grid>
      <Box className="table-border container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              maxDate={endDate}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <Button
              className="admin-submit-btn"
              onClick={() =>
                dispatch(
                  getUsedDetails({
                    start: pagination.pageIndex * pagination.pageSize,
                    size: pagination.pageSize,
                    filters: JSON.stringify(columnFilters ?? []),
                    globalFilter: globalFilter ?? '',
                    sorting: JSON.stringify(sorting ?? []),
                    startDate: startDate,
                    endDate: endDate
                  })
                )
              }
            >
              Search
            </Button>
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
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductUsedDetails;
