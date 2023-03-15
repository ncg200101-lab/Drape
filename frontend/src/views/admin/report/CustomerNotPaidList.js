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
    accessorKey: 'created',
    header: 'Create Date'
  },
  {
    accessorKey: 'gender',
    header: 'Gender'
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
    accessorKey: 'asgCtmStylist',
    header: 'Assign Customer Stylist'
  },
  {
    accessorKey: 'kidsname',
    header: 'Kids Name'
  },
  {
    accessorKey: 'age',
    header: 'Age'
  }
];

const CustomerNotPaidList = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        created:
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(0, 10) +
          ' ' +
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(11, 19),
        gender: faker.helpers.arrayElement(['Women', 'Men', 'Kids']),
        fullname: faker.name.fullName(),
        email: faker.internet.email(),
        asgCtmStylist: faker.helpers.arrayElement([
          'Stylist',
          'Inventory',
          'QA',
          'Support Guy'
        ]),
        kidsname: faker.name.fullName(),
        age: faker.datatype.number({ min: 1, max: 120 })
      });
    }
    setTableData(info);
  }, []);
  DFnewLogger(tableData);
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">
          Customer List Who Not Paid
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

export default CustomerNotPaidList;
