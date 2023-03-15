import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { Button, Box, Typography, Tooltip, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard,
  faMagicWandSparkles,
  faEye
} from '@fortawesome/free-solid-svg-icons';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

const action_btn = (
  <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
    <Tooltip title="Matching" arrow>
      <Button
        className="admin-table-btn password"
        onClick={() => {
          DFnewLogger('Table/set_password_action');
        }}
      >
        <FontAwesomeIcon icon={faMagicWandSparkles} />
      </Button>
    </Tooltip>
    <Tooltip title="Browse All" arrow>
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
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'subs',
    header: 'Subs.'
  },
  {
    accessorKey: 'mayDate',
    header: 'May Date'
  },
  {
    accessorKey: 'action',
    header: 'Action'
  }
];

const Prediction = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        subs: faker.helpers.arrayElement(['1', '2']),
        mayDate: faker.date
          .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
          .toISOString()
          .slice(0, 10),
        action: action_btn
      });
    }
    setTableData(info);
  }, []);
  DFnewLogger(tableData);
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Customer List</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Box className="table-border container">
        <Grid container spacing={2}>
          <Grid item xs={12} margin="10px 0 0 10px">
            <Button variant="contained">May</Button>{' '}
            <Button variant="outlined">June</Button>{' '}
            <Button variant="outlined">July</Button>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography className="table-header">Parents List</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography className="table-header">Kids List</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Table data={tableData} columns={columns} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Table data={tableData} columns={columns} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Prediction;
