import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

const columns = [
  {
    accessorKey: 'toName',
    header: 'To Name'
  },
  {
    accessorKey: 'toEmail',
    header: 'To Email'
  },
  {
    accessorKey: 'fromName',
    header: 'From Name'
  },
  {
    accessorKey: 'fromEmail',
    header: 'From Email'
  },
  {
    accessorKey: 'giftCode',
    header: 'GiftCode'
  },
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    accessorKey: 'deliveryDate',
    header: 'Delivery Date'
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expiry Date'
  },
  {
    accessorKey: 'createdDate',
    header: 'Created Date'
  },
  {
    accessorKey: 'deliveryStatus',
    header: 'Delivery Status'
  },
  {
    accessorKey: 'action',
    header: 'Action'
  }
];

const GiftCodeEmail = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    setTableData(info);
  }, []);
  DFnewLogger(tableData);
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">GiftCode Email</Typography>
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

export default GiftCodeEmail;
