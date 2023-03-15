import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { Button, Box, Typography, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard,
  faEnvelope,
  faEye,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

const action_btn = (
  <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
    <Tooltip title="Review" arrow>
      <Button
        className="admin-table-btn password"
        onClick={() => {
          DFnewLogger('Table/review_action');
        }}
      >
        <FontAwesomeIcon icon={faEye} />
      </Button>
    </Tooltip>
    <Tooltip title="Email" arrow>
      <Button
        className="admin-table-btn edit"
        onClick={() => {
          DFnewLogger('Table/email_action');
        }}
      >
        <FontAwesomeIcon icon={faEnvelope} />
      </Button>
    </Tooltip>
    <Tooltip title="Delete" arrow>
      <Button
        className="admin-table-btn delete"
        onClick={() => {
          DFnewLogger('Table/delete_action');
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
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
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'account',
    header: 'Assign Customer Stylist'
  },
  {
    accessorKey: 'created',
    header: 'Create Date'
  },
  {
    accessorKey: 'kidsname',
    header: 'Kids Name'
  },
  {
    accessorKey: 'gender',
    header: 'Gender'
  },
  {
    accessorKey: 'action',
    header: 'Action'
  }
];

const CustomerPaidList = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        fullname: faker.name.fullName(),
        email: faker.internet.email(),
        account: faker.helpers.arrayElement([
          'Stylist',
          'Inventory',
          'QA',
          'Support Guy'
        ]),
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
        kidsname: faker.name.fullName(),
        gender: faker.helpers.arrayElement(['Women', 'Men', 'Kids']),
        action: action_btn
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
      <Box className="table-border">
        <Table data={tableData} columns={columns} />
      </Box>
    </>
  );
};

export default CustomerPaidList;
