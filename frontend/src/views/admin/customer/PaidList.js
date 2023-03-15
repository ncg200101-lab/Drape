import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import {
  Button,
  Box,
  Typography,
  Tooltip,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Breadcrumbs
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard,
  faEnvelope,
  faEye,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';
import { useEffect, useState } from 'react';

const previous = (
  <Grid container>
    <Grid item xs={6}>
      <Typography>Stylist:&nbsp;</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography>No yet</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography>Inventory:&nbsp;</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography>No yet</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography>QA:&nbsp;</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography>No yet</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography>Support:&nbsp;</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography>No yet</Typography>
    </Grid>
  </Grid>
);
const employeeList = (
  <Grid container rowSpacing={1}>
    <Grid item xs={3} className="v-align-center">
      <Typography className="info-item">Stylist</Typography>
    </Grid>
    <Grid item xs={9}>
      <FormControl fullWidth>
        <InputLabel>-- Assign Stylist --</InputLabel>
        <Select size="small" label="-- Assign Stylist --" className="info">
          {[
            'stylist_1',
            'stylist_2',
            'stylist_3',
            'stylist_4',
            'stylist_5'
          ].map((item, index) => (
            <MenuItem key={index} value={index}>
              <Typography className="item">{item}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={3} className="v-align-center">
      <Typography className="success-item">Inventory</Typography>
    </Grid>
    <Grid item xs={9}>
      <FormControl fullWidth>
        <InputLabel>-- Assign Inventory --</InputLabel>
        <Select size="small" label="-- Assign Inventory --" className="success">
          {[
            'inventory_1',
            'inventory_2',
            'inventory_3',
            'inventory_4',
            'inventory_5'
          ].map((item, index) => (
            <MenuItem key={index} value={index}>
              <Typography className="item">{item}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={3} className="v-align-center">
      <Typography className="warning-item">QA</Typography>
    </Grid>
    <Grid item xs={9}>
      <FormControl fullWidth>
        <InputLabel>-- Assign QA --</InputLabel>
        <Select size="small" label="-- Assign QA --" className="warning">
          {['QA_1', 'QA_2', 'QA_3', 'QA_4', 'QA_5'].map((item, index) => (
            <MenuItem key={index} value={index}>
              <Typography className="item">{item}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={3} className="v-align-center">
      <Typography className="error-item">Support</Typography>
    </Grid>
    <Grid item xs={9}>
      <FormControl fullWidth>
        <InputLabel>-- Assign Support-- </InputLabel>
        <Select size="small" label="-- Assign Support --" className="error">
          {[
            'support_1',
            'support_2',
            'support_3',
            'support_4',
            'support_5'
          ].map((item, index) => (
            <MenuItem key={index} value={index}>
              <Typography className="item">{item}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  </Grid>
);
const actionBTN = (props) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Link to="/dfadmin/customer/paid-list/extra-product">
          <Button fullWidth variant="contained" color="primary">
            Extra Product
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/dfadmin/customer/women-view">
          <Button fullWidth variant="contained" color="primary">
            View Profile
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/dfadmin/customer/paid-list/product-list">
          <Button fullWidth variant="contained" color="secondary">
            Product List
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/dfadmin/customer/paid-list/order-receipt">
          <Button fullWidth variant="contained" color="secondary">
            Order Receipt
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/dfadmin/customer/paid-list/catelog">
          <Button fullWidth variant="contained" color="success">
            Catelog
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/dfadmin/customer/paid-list/email">
          <Button fullWidth variant="contained" color="success">
            Email
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/dfadmin/customer/paid-list/matching">
          <Button fullWidth variant="contained" color="warning">
            Matching
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/dfadmin/customer/paid-list/browse-all">
          <Button fullWidth variant="contained" color="warning">
            Browse All
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/dfadmin/customer/paid-list/previous-work">
          <Button fullWidth variant="contained" color="error">
            MPWL
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/dfadmin/customer/paid-list/previous-order">
          <Button fullWidth variant="contained" color="error">
            Prev Order
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};
const deleteBTN = (
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
);

const columns = [
  {
    accessorKey: 'fullName',
    header: 'Full Name'
  },
  {
    accessorKey: 'rqDate',
    header: 'Rq Date'
  },
  {
    accessorKey: 'gender',
    header: 'Gender'
  },
  {
    accessorKey: 'fitNumber',
    header: 'Fit Number'
  },
  {
    accessorKey: 'orderDate',
    header: 'Order Date'
  },
  {
    accessorKey: 'orderNumber',
    header: 'Order Number'
  },
  {
    accessorKey: 'previous',
    header: 'Previous',
    size: 170
  },
  {
    accessorKey: 'assignEmployee',
    header: 'Assign Employee',
    size: 300
  },
  {
    accessorKey: 'customerAction',
    header: 'Customer Action',
    size: 300
  },
  {
    accessorKey: 'kidName',
    header: 'Kid Name'
  },
  {
    accessorKey: 'assignEmployeeKid',
    header: 'Assign Employee (Kid)',
    size: 300
  },
  {
    accessorKey: 'kidsAction',
    header: 'Kids Action',
    size: 300
  },
  {
    accessorKey: 'delete',
    header: 'Delete'
  }
];

const PaidList = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        fullName: faker.name.fullName(),
        rqDate:
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(0, 10) +
          ' ' +
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(11, 19),
        gender: faker.helpers.arrayElement(['Women', 'Men', 'Kids']),
        fitNumber: faker.helpers.arrayElement(['1st', '2nd', '3rd']),
        orderDate:
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(0, 10) +
          ' ' +
          faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
            .toISOString()
            .slice(11, 19),
        orderNumber: '#DFPYMID123',
        previous: previous,
        assignEmployee: employeeList,
        customerAction: actionBTN(i),
        kidName: faker.name.fullName(),
        assignEmployeeKid: employeeList,
        kidsAction: actionBTN(),
        delete: deleteBTN
      });
    }
    setTableData(info);
  }, []);
  DFnewLogger(tableData);
  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfadmin" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link current">Paid List</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Customer List Who Paid</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={tableData} columns={columns} />
      </Box>
    </>
  );
};

export default PaidList;
