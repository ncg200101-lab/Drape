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
    accessorKey: 'paymentId',
    header: 'Payment ID'
  },
  {
    accessorKey: 'userName',
    header: 'User Name'
  },
  {
    accessorKey: 'userEmail',
    header: 'User Email'
  },
  {
    accessorKey: 'kidName',
    header: 'Kid Name'
  },
  {
    accessorKey: 'fit',
    header: 'FIT'
  },
  {
    accessorKey: 'shippingDate',
    header: 'Shipping Date'
  },
  {
    accessorKey: 'autoCheckoutDate',
    header: 'Auto Checkout Date'
  },
  {
    accessorKey: 'paymentDate',
    header: 'Payment Date'
  },
  {
    accessorKey: 'action',
    header: 'Action'
  }
];

const ChangeAutoCheckDate = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        paymentId: faker.date
          .between('2023-02-26T00:00:00.000Z', '2023-03-11T00:00:00.000Z')
          .toISOString()
          .slice(0, 10),
        userName: faker.name.fullName(),
        userEmail: faker.internet.email(),
        kidName: faker.name.fullName(),
        fit: faker.helpers.arrayElement([
          '1st',
          '2nd',
          '3th',
          '4th',
          '5th',
          '6th',
          '7th'
        ]),
        shippingDate: faker.date
          .between('2023-02-26T00:00:00.000Z', '2023-03-11T00:00:00.000Z')
          .toISOString()
          .slice(0, 10),
        autoCheckoutDate: faker.date
          .between('2023-02-26T00:00:00.000Z', '2023-03-11T00:00:00.000Z')
          .toISOString()
          .slice(0, 10),
        paymentDate:
          faker.date
            .between('2023-02-26T00:00:00.000Z', '2023-03-11T00:00:00.000Z')
            .toISOString()
            .slice(0, 10) +
          faker.date
            .between('2023-02-26T00:00:00.000Z', '2023-03-11T00:00:00.000Z')
            .toISOString()
            .slice(11, 19),
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

export default ChangeAutoCheckDate;
