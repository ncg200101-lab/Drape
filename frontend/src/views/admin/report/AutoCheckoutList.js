import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faDownload } from '@fortawesome/free-solid-svg-icons';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

const columns = [
  {
    accessorKey: 'orderDate',
    header: 'Order Date'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'kidName',
    header: 'Kid Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'profileType',
    header: 'Profile Type'
  },
  {
    accessorKey: 'stylistName',
    header: 'Stylist Name'
  },
  {
    accessorKey: 'finalizeDate',
    header: 'Finalize Date'
  },
  {
    accessorKey: 'productCount',
    header: 'Product Count'
  },
  {
    accessorKey: 'prductPrice',
    header: 'Product Price'
  },
  {
    accessorKey: 'autoCheckoutDate',
    header: 'Auto Checkout Date'
  }
];

const AutoCheckoutList = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    setTableData(info);
  }, []);
  DFnewLogger(tableData);
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">
          Default Customer Auto Checkout List
        </Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Box className="table-border container">
        <Grid container>
          <Grid item xs={12} margin="10px">
            <Button variant="contained">
              <FontAwesomeIcon icon={faDownload} />
              &nbsp;Download PDF
            </Button>{' '}
            <Button variant="contained">
              <FontAwesomeIcon icon={faDownload} />
              &nbsp;Download EXCEL
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Table data={tableData} columns={columns} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AutoCheckoutList;
