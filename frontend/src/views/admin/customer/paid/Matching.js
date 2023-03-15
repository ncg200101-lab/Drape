import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography, Paper, Button, Tooltip } from '@mui/material';
import {
  faEye,
  faGaugeHigh,
  faPlus,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import DFnewImgTag from 'utils/DFnewImgTag';
import GenS3Link from 'utils/GenS3Link';

import Table from 'ui-component/Table';

const Vote = GenS3Link('landing/images/client/post/vote');

const Matching = () => {
  const action_btn = (
    <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
      <Tooltip title="Add" arrow>
        <Link to="/dfadmin/customer/paid-list/matching">
          <Button className="admin-table-btn password">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Link>
      </Tooltip>
      <Tooltip title="View" arrow>
        <Link to="/dfadmin/customer/paid-list">
          <Button className="admin-table-btn edit">
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </Link>
      </Tooltip>
      <Tooltip title="Delete" arrow>
        <Button className="admin-table-btn delete">
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </Tooltip>
    </div>
  );
  const columns = [
    {
      accessorKey: 'matchingPercentage',
      header: 'Matching Percentage',
      size: 30
    },
    {
      accessorKey: 'brandName',
      header: 'Brand Name'
    },
    {
      accessorKey: 'productName1',
      header: 'Product Name 1'
    },
    {
      accessorKey: 'productName2',
      header: 'Product Name 2'
    },
    {
      accessorKey: 'styleNo',
      header: 'Style No.'
    },
    {
      accessorKey: 'productImage',
      header: 'Product Image'
    },
    {
      accessorKey: 'size',
      header: 'Size'
    },
    {
      accessorKey: 'color',
      header: 'Color'
    },
    {
      accessorKey: 'price',
      header: 'Price'
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity'
    },
    {
      accessorKey: 'action',
      header: 'Action'
    }
  ];

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 3; i++) {
      info.push({
        matchingPercentage: '20%',
        brandName: 'POLO',
        productName1: 'women sky top',
        productName2: 'women sky bottom',
        styleNo: 'WA1A11-10-2080-4',
        productImage: (
          <DFnewImgTag
            src={`${Vote}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '74px' }}
            alt="Drape Fit News Image"
          />
        ),
        size: '10L (10 - 12)',
        color: 'Sky Blue',
        price: '29.99',
        quantity: '2',
        action: action_btn
      });
    }
    setTableData(info);
  }, []);

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">
          Matching List of John Doe
        </Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Table data={tableData} columns={columns} />
      </Paper>
    </>
  );
};

export default Matching;
