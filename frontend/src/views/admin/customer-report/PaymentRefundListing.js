import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { Button, Box, Typography, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEye } from '@fortawesome/free-solid-svg-icons';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

const action_btn = (
  <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
    <Tooltip title="View" arrow>
      <Button
        className="admin-table-btn edit"
        onClick={() => {
          DFnewLogger('Table/edit_action');
        }}
      >
        <FontAwesomeIcon icon={faEye} />
      </Button>
    </Tooltip>
  </div>
);

const columns = [
  {
    accessorKey: 'refundPaymentDate',
    header: 'Refund Payment Date'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'profileGender',
    header: 'Profile Gender'
  },
  {
    accessorKey: 'profileCount',
    header: 'Profile Count'
  },
  {
    accessorKey: 'transactionID',
    header: 'Transaction ID.'
  },
  {
    accessorKey: 'refundTransactionID',
    header: 'Refund Transaction ID.'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    accessorKey: 'orderType',
    header: 'Order Type'
  },
  {
    accessorKey: 'action',
    header: 'Action'
  }
];

const PaymentRefundListing = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        refundPaymentDate: faker.date
          .between('2023-02-26T00:00:00.000Z', '2023-03-11T00:00:00.000Z')
          .toISOString()
          .slice(0, 10),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        profileGender: faker.helpers.arrayElement(['Women', 'Men', 'Kid']),
        profileCount: faker.helpers.arrayElement(['1', '2', '3']),
        transactionID: 'txn_' + faker.random.alphaNumeric(20),
        refundTransactionID: 'txn_' + faker.random.alphaNumeric(20),
        amount: '$' + faker.helpers.arrayElement(['20', '10']),
        orderType: faker.helpers.arrayElement(['Box Order', 'Checkout Order']),
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

export default PaymentRefundListing;
