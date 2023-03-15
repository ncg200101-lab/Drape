import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

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
    accessorKey: 'purchasePrice',
    header: 'Purchase Price'
  },
  {
    accessorKey: 'salesPrice',
    header: 'Sales Price'
  }
];

const ReturnProcessedSmRpt = () => {
  const [startDate, setStartDate] = useState(new Date('2023/05/01'));
  const [endDate, setEndDate] = useState(new Date('2023/05/18'));
  const [tableData, setTableData] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    let info = [];
    // for (let i = 0; i < 25; i++) {
    //   info.push({
    //     name: faker.name.fullName(),
    //     email: faker.internet.email(),
    //     subs: faker.helpers.arrayElement(['1', '2']),
    //     mayDate: faker.date
    //       .between('2020-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
    //       .toISOString()
    //       .slice(0, 10),
    //     action: action_btn
    //   });
    // }
    setTableData(info);
  }, []);
  DFnewLogger(tableData);

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
      <Box className="admin-page-title-part">
        <Typography className="page-title">Return Processed Summary</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Box className="table-border container">
        <Grid container spacing={2}>
          <Grid item xs={12} margin="10px 0 0 10px" className="v-align-center">
            <FormControl
              className="spec-height"
              sx={{
                ...theme.typography.customSelect,
                width: '240px'
              }}
            >
              <InputLabel>User Type</InputLabel>
              <Select name="userType" MenuProps={selectProps}>
                {['Women', 'Men', 'Girl', 'Boy'].map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <Button className="spec-height" variant="contained">
              Filter
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Table data={tableData} columns={columns} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ReturnProcessedSmRpt;
