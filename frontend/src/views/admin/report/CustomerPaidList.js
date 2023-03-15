import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { Button, Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faDownload } from '@fortawesome/free-solid-svg-icons';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

const columns = [
  {
    accessorKey: 'rqDate',
    header: 'Rq Date'
  },
  {
    accessorKey: 'fullname',
    header: 'Full Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'profile',
    header: 'Profile'
  },
  {
    accessorKey: 'fitNumber',
    header: 'Fit Number'
  },
  {
    accessorKey: 'previousStylist',
    header: 'Previous Stylist'
  },
  {
    accessorKey: 'asgCtmStylist',
    header: 'Assign Customer Stylist'
  },
  {
    accessorKey: 'kidsName',
    header: 'Kids Name'
  },
  {
    accessorKey: 'age',
    header: 'Age'
  },
  {
    accessorKey: 'asgKidStylist',
    header: 'Assign Kid Stylist'
  }
];

const CustomerPaidList = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        rqDate:
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(0, 10) +
          ' ' +
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(11, 19),
        fullname: faker.name.fullName(),
        email: faker.internet.email(),
        profile: faker.helpers.arrayElement(['Women', 'Men', 'Kids']),
        fitNumber: faker.helpers.arrayElement([
          '1st',
          '2nd',
          '3rd',
          '4th',
          '5th',
          '6th',
          '7th'
        ]),
        previousStylist: faker.name.fullName(),
        asgCtmStylist: faker.name.fullName(),
        kidsName: faker.name.fullName(),
        age: faker.datatype.number({ min: 1, max: 100 }),
        asgKidStylist: faker.name.fullName()
      });
    }
    setTableData(info);
  }, []);
  DFnewLogger(tableData);
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Customer List Who Paid</Typography>
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

export default CustomerPaidList;
