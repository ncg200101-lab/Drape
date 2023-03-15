import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faker } from '@faker-js/faker';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

const columns = [
  {
    accessorKey: 'createdDate',
    header: 'Created Date'
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'gender',
    header: 'Gender'
  },
  {
    accessorKey: 'assignCustomerStylist',
    header: 'Assign Customer Stylist'
  },
  {
    accessorKey: 'kidCount',
    header: 'Kid Count'
  },
  {
    accessorKey: 'paidStatus',
    header: 'Paid Status'
  }
];

const AllCustomer = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        createdDate:
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(0, 10) +
          ' ' +
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(11, 19),
        fullName: faker.name.fullName(),
        email: faker.internet.email(),
        gender: faker.helpers.arrayElement(['Women', 'Men', 'Kids']),
        assignCustomerStylist: faker.helpers.arrayElement([
          'Stylist',
          'Inventory',
          'QA',
          'Support Guy',
          'Not Assign'
        ]),
        kidCount: faker.helpers.arrayElement(['0', '1', '2', '3']),
        paidStatus: faker.helpers.arrayElement(['Not Paid', 'Paid'])
      });
    }
    setTableData(info);
  }, []);
  DFnewLogger(tableData);
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">All Customer</Typography>
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

export default AllCustomer;
