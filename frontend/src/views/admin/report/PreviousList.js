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
    accessorKey: 'fullname',
    header: 'Full Name'
  },
  {
    accessorKey: 'gender',
    header: 'Gender'
  },
  {
    accessorKey: 'profile',
    header: 'Profile'
  },
  {
    accessorKey: 'orderdate',
    header: 'Order Date'
  },
  {
    accessorKey: 'assigncustomerstylist',
    header: 'Assign Customer Stylist'
  },
  {
    accessorKey: 'kidname',
    header: 'Kid Name'
  },
  {
    accessorKey: 'assignkidstylist',
    header: 'Assign Kid Stylist'
  }
];

const PreviousList = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        fullname: faker.name.fullName(),
        gender: faker.helpers.arrayElement(['Women', 'Men', 'Kids']),
        profile: faker.helpers.arrayElement([
          '1st',
          '2nd',
          '3rd',
          '4th',
          '5th',
          '6th',
          '7th'
        ]),
        orderdate: faker.date
          .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
          .toDateString(),
        assigncustomerstylist: faker.name.fullName(),
        kidname: faker.name.fullName(),
        assignkidstylist: faker.name.fullName()
      });
    }
    setTableData(info);
  }, []);
  DFnewLogger(tableData);
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">
          Previous Work List Reports
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

export default PreviousList;
