import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { Button, Box, Typography, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard,
  faClipboardCheck
} from '@fortawesome/free-solid-svg-icons';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

const action_btn = (
  <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
    <Tooltip title="Check Out Process" arrow>
      <Button
        className="admin-table-btn edit"
        onClick={() => {
          DFnewLogger('Table/edit_action');
        }}
      >
        <FontAwesomeIcon icon={faClipboardCheck} />
      </Button>
    </Tooltip>
  </div>
);

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
    accessorKey: 'productPrice',
    header: 'Product Price'
  },
  {
    accessorKey: 'transactionNo',
    header: 'Transaction No.'
  },
  {
    accessorKey: 'action',
    header: 'Action'
  }
];

const DefaultCustomerList = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        orderDate: faker.date
          .between('2023-02-26T00:00:00.000Z', '2023-03-11T00:00:00.000Z')
          .toISOString()
          .slice(0, 10),
        name: faker.name.fullName(),
        kidName: faker.name.fullName(),
        email: faker.internet.email(),
        profileType: faker.helpers.arrayElement(['Women', 'Men', 'Kid']),
        stylistName: faker.name.fullName(),
        finalizeDate: faker.date
          .between('2023-02-26T00:00:00.000Z', '2023-03-11T00:00:00.000Z')
          .toISOString()
          .slice(0, 10),
        productCount: faker.helpers.arrayElement([
          '0',
          '1',
          '2',
          '3',
          '4',
          '5'
        ]),
        productPrice: faker.helpers.arrayElement(['20', '10']),
        transactionNo: 'txn_' + faker.random.alphaNumeric(20),
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
          Defaulter Customer List Who Not Checkout
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

export default DefaultCustomerList;
