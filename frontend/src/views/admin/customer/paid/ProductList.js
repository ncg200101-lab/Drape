import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Tooltip, Button } from '@mui/material';
import {
  faGaugeHigh,
  faEdit,
  faPrint,
  faEye,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Barcode from 'react-barcode';

import DFnewImgTag from 'utils/DFnewImgTag';
import GenS3Link from 'utils/GenS3Link';
import Table from 'ui-component/Table';

const Vote = GenS3Link('landing/images/client/post/vote');

const action_btn = (
  <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
    <Tooltip title="Edit" arrow>
      <Button className="admin-table-btn password">
        <FontAwesomeIcon icon={faEdit} />
      </Button>
    </Tooltip>
    <Tooltip title="Print" arrow>
      <Button className="admin-table-btn edit">
        <FontAwesomeIcon icon={faPrint} />
      </Button>
    </Tooltip>
    <Tooltip title="View" arrow>
      <Link to="/dfadmin/customer/paid-list/product-list/view-product">
        <Button className="admin-table-btn deactive">
          <FontAwesomeIcon icon={faEye} />
        </Button>
      </Link>
    </Tooltip>
    <Tooltip title="Add" arrow>
      <Button className="admin-table-btn delete">
        <FontAwesomeIcon icon={faPlus} />
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
    accessorKey: 'customerDecision',
    header: 'Customer Decision'
  },
  {
    accessorKey: 'image',
    header: 'Image'
  },
  {
    accessorKey: 'barcode',
    header: 'Barcode'
  },
  {
    accessorKey: 'styleNumber',
    header: 'Style Number'
  },
  {
    accessorKey: 'action',
    header: 'Action'
  }
];

const ProductList = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let info = [];
    for (let i = 0; i < 3; i++) {
      info.push({
        name: 'product name',
        customerDecision: 'Pending',
        image: (
          <DFnewImgTag
            src={`${Vote}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '74px' }}
            alt="Drape Fit News Image"
          />
        ),
        barcode: <Barcode value="product name" height={50} width={1} />,
        styleNumber: 'WA3A31-10-1208-20',
        action: action_btn
      });
    }
    setTableData(info);
  }, []);

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Add Product for John Doe</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Box className="table-border">
        <Table data={tableData} columns={columns} />
      </Box>
    </>
  );
};

export default ProductList;
