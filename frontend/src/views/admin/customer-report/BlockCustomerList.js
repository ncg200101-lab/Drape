import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    accessorKey: 'registrationDate',
    header: 'Registration Date'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status'
  },
  {
    accessorKey: 'lastLogin',
    header: 'Last Login'
  },
  {
    accessorKey: 'action',
    header: 'Action'
  }
];

const BlockCustomerList = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    setTableData(info);
  }, []);
  DFnewLogger(tableData);
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Block Customer Listing</Typography>
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

export default BlockCustomerList;
