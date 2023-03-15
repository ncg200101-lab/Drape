import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faDashboard, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Button,
  Typography,
  Tooltip,
  Breadcrumbs,
  Grid
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faker } from '@faker-js/faker';
import 'yup-phone';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const Vote = GenS3Link('landing/images/client/post/vote');

const ManageProduct = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 25; i++) {
      info.push({
        productName1: faker.commerce.productName(),
        productName2: faker.commerce.productName(),
        productImage: (
          <DFnewImgTag
            src={`${Vote}.webp`}
            fallback={`${Vote}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '74px' }}
            alt="Drape Fit News Image"
          />
        ),
        purchasePrice: 10,
        salePrice: 20,
        quantity: 125,
        action: action_btn
      });
    }
    setTableData(info);
  }, []);
  DFnewLogger(tableData);
  const action_btn = (
    <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
      <Tooltip title="Edit" arrow>
        <Link to="/dfinventory/add-manual-product">
          <Button className="admin-table-btn password">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Link>
      </Tooltip>
    </div>
  );
  const columns = [
    {
      accessorKey: 'productName1',
      header: 'Product Name 1'
    },
    {
      accessorKey: 'productName2',
      header: 'Product Name 2'
    },
    {
      accessorKey: 'productImage',
      header: 'Product Image'
    },
    {
      accessorKey: 'purchasePrice',
      header: 'Purchase Price'
    },
    {
      accessorKey: 'salePrice',
      header: 'Sale Price'
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

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link current">
              Manual Return Product
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Manual Return Product</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={tableData} columns={columns} />
      </Box>
    </>
  );
};

export default ManageProduct;
