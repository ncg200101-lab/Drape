import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { Button, Box, Typography, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

const action_btn = (
  <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
    <Tooltip title="Change Product Page" arrow>
      <Button
        className="admin-table-btn password"
        onClick={() => {
          DFnewLogger('Table/email_action');
        }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>
    </Tooltip>
    <Tooltip title="Review" arrow>
      <Button
        className="admin-table-btn edit"
        onClick={() => {
          DFnewLogger('Table/review_action');
        }}
      >
        <FontAwesomeIcon icon={faEye} />
      </Button>
    </Tooltip>
  </div>
);

const columns = [
  {
    accessorKey: 'fullname',
    header: 'Full Name'
  },
  {
    accessorKey: 'kidname',
    header: 'Kid Name'
  },
  {
    accessorKey: 'rqdate',
    header: 'Rq Date'
  },
  {
    accessorKey: 'gender',
    header: 'Gender'
  },
  {
    accessorKey: 'fitnumber',
    header: 'Fit Number'
  },
  {
    accessorKey: 'orderdate',
    header: 'Order Date'
  },
  {
    accessorKey: 'ordernumber',
    header: 'Order Number'
  },
  {
    accessorKey: 'action',
    header: 'Action'
  }
];

const DeclinedProducts = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        fullname: faker.name.fullName(),
        kidname: faker.name.fullName(),
        rqdate: faker.date
          .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
          .toDateString(),
        gender: faker.helpers.arrayElement(['Women', 'Men', 'Kids']),
        fitnumber: faker.helpers.arrayElement([
          '1st',
          '2nd',
          '3rd',
          '4th',
          '5th',
          '6th',
          '7th'
        ]),
        orderdate:
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(0, 10) +
          ' ' +
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(11, 19),
        ordernumber:
          '#DFPYMID ' + faker.datatype.number({ min: 500, max: 2000 }),
        action: action_btn
      });
    }
    setTableData(info);
  }, []);
  DFnewLogger(tableData);
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Declined Order Listing</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Box className="table-border">
        <Table data={tableData} columns={columns} />
      </Box>
    </>
  );
};

export default DeclinedProducts;
