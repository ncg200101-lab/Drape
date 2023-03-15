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
    <Tooltip title="View" arrow>
      <Button
        className="admin-table-btn password"
        onClick={() => {
          DFnewLogger('Table/edit_action');
        }}
      >
        <FontAwesomeIcon icon={faEye} />
      </Button>
    </Tooltip>
    <Tooltip title="Edit" arrow>
      <Button
        className="admin-table-btn edit"
        onClick={() => {
          DFnewLogger('Table/edit_action');
        }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>
    </Tooltip>
  </div>
);

const columns = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'profile',
    header: 'Profile'
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
    accessorKey: 'date',
    header: 'Date'
  },
  {
    accessorKey: 'scheduledFixes',
    header: 'Scheduled Fixes'
  },
  {
    accessorKey: 'timeFix',
    header: 'Time Fix'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'action',
    header: 'Action'
  }
];

const SubscriptionCancellation = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        name: faker.name.fullName(),
        profile: faker.helpers.arrayElement(['Women', 'Men', 'Kid']),
        kidName: faker.name.fullName(),
        email: faker.internet.email(),
        date: faker.date
          .between('2023-02-26T00:00:00.000Z', '2023-03-11T00:00:00.000Z')
          .toISOString()
          .slice(0, 10),
        scheduledFixes: faker.helpers.arrayElement(['Yes', 'No']),
        timeFix: faker.helpers.arrayElement(['Every 1 month', 'Every 2 month']),
        status: 'Subscription',
        action: action_btn
      });
    }
    setTableData(info);
  }, []);
  DFnewLogger(tableData);
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">
          Refund Customer Listing With Status
        </Typography>
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

export default SubscriptionCancellation;
