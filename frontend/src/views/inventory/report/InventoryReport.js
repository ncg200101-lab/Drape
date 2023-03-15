import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Breadcrumbs, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';

const InventoryReport = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        name: 'Name',
        men: 123,
        menTotal: 321.99,
        women: 123,
        womenTotal: 321.99,
        boyKid: 12,
        boyKidTotal: 21.49,
        girlKid: 12,
        girlKidTotal: 21.49
      });
    }
    setTableData(info);
  }, []);
  const columns = [
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      accessorKey: 'men',
      header: 'Men'
    },
    {
      accessorKey: 'menTotal',
      header: 'Men Total'
    },
    {
      accessorKey: 'women',
      header: 'Women'
    },
    {
      accessorKey: 'womenTotal',
      header: 'Women Total'
    },
    {
      accessorKey: 'boyKid',
      header: 'Boy Kid'
    },
    {
      accessorKey: 'boyKidTotal',
      header: 'Boy Kid Total'
    },
    {
      accessorKey: 'girlKid',
      header: 'Girl Kid'
    },
    {
      accessorKey: 'girlKidTotal',
      header: 'Girl Kid Total'
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
            <Typography className="home-link disable">Report</Typography>
            <Typography className="home-link current">
              Inventory Report
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Inventory Report</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={tableData} columns={columns} />
      </Box>
    </>
  );
};

export default InventoryReport;
