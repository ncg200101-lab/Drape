import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Typography,
  Breadcrumbs,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';

import Table from 'ui-component/Table';

const InventorySummary = () => {
  const [startDate, setStartDate] = useState(new Date('2023/05/01'));
  const [endDate, setEndDate] = useState(new Date('2023/05/18'));
  const [tableData, setTableData] = useState([]);
  const [userType, setUserType] = useState(0);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        brandName: 'Name',
        quantity: 123,
        used: 321,
        currentStock: 999,
        purchasePrice: 123,
        salesPrice: 321
      });
    }
    setTableData(info);
  }, []);
  const columns = [
    {
      accessorKey: 'brandName',
      header: 'Brand Name'
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity'
    },
    {
      accessorKey: 'used',
      header: 'Used'
    },
    {
      accessorKey: 'currentStock',
      header: 'Current Stock'
    },
    {
      accessorKey: 'purchasePrice',
      header: 'Purchase Price'
    },
    {
      accessorKey: 'salesPrice',
      header: 'Sales Price'
    }
  ];
  const selectProps = {
    PaperProps: {
      style: {
        maxHeight: 360,
        width: 220
      }
    }
  };

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link disable">Report</Typography>
            <Typography className="home-link current">
              Inventory Summary
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Inventory Summary</Typography>
        </Grid>
      </Grid>
      <Box className="table-border container">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={3}>
                <FormControl fullWidth>
                  <Select
                    name="userType"
                    onChange={(e) => setUserType(e.target.value)}
                    MenuProps={selectProps}
                    value={userType}
                    size="small"
                  >
                    {['-- User Type --', 'Men', 'Women', 'Boy', 'Girl'].map(
                      (item, index) => (
                        <MenuItem key={index} value={index}>
                          {item}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={5} md={4}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  maxDate={startDate}
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={1}>
                <Button className="admin-submit-btn">Filter</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Table data={tableData} columns={columns} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InventorySummary;
