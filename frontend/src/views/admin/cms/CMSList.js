import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit } from '@fortawesome/free-solid-svg-icons';

import DFnewLogger from 'utils/DFnewLogger';
import Table from 'ui-component/Table';

const CMSList = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData([
      {
        pagelist: 'Order History',
        action: action_btn
      },
      {
        pagelist: 'Who we can style',
        action: action_btn
      },
      {
        pagelist: 'Find Your Size',
        action: action_btn
      },
      {
        pagelist: 'About Style Profile',
        action: action_btn
      },
      {
        pagelist: 'More Services',
        action: action_btn
      },
      {
        pagelist: 'Security',
        action: action_btn
      },
      {
        pagelist: 'FAQ about stylists',
        action: action_btn
      },
      {
        pagelist: 'Schedule your Shipment',
        action: action_btn
      },
      {
        pagelist: 'More Styles',
        action: action_btn
      },
      {
        pagelist: 'Customer service',
        action: action_btn
      },
      {
        pagelist: 'Drape Fit testimonials',
        action: action_btn
      },
      {
        pagelist: 'Extra Fits',
        action: action_btn
      },
      {
        pagelist: 'Price Range Of Drape Fit Clothing',
        action: action_btn
      },
      {
        pagelist: 'Drape Fit Clothing',
        action: action_btn
      },
      {
        pagelist: 'Drape Fit vs Online Shopping or in a store shopping',
        action: action_btn
      },
      {
        pagelist: 'What Is Drape Fit',
        action: action_btn
      },
      {
        pagelist: 'How it works',
        action: action_btn
      },
      {
        pagelist: 'News',
        action: action_btn
      },
      {
        pagelist: 'Investors',
        action: action_btn
      },
      {
        pagelist: 'Style Blog',
        action: action_btn
      },
      {
        pagelist: 'Feedback and Review',
        action: action_btn
      },
      {
        pagelist: 'Executive Team',
        action: action_btn
      },
      {
        pagelist: 'Contact Us',
        action: action_btn
      },
      {
        pagelist: 'Our Mission',
        action: action_btn
      },
      {
        pagelist: 'Return & Exchange',
        action: action_btn
      },
      {
        pagelist: 'Track Order',
        action: action_btn
      },
      {
        pagelist: 'Our Stylist',
        action: action_btn
      },
      {
        pagelist: 'Who we are',
        action: action_btn
      },
      {
        pagelist: 'Work with us',
        action: action_btn
      },
      {
        pagelist: 'Help Center',
        action: action_btn
      },
      {
        pagelist: 'Terms & Conditions',
        action: action_btn
      },
      {
        pagelist: 'FAQ',
        action: action_btn
      },
      {
        pagelist: 'cookie-info',
        action: action_btn
      },
      {
        pagelist: 'privacy',
        action: action_btn
      },
      {
        pagelist: 'supply-chain-information',
        action: action_btn
      },
      {
        pagelist: 'sitemap',
        action: action_btn
      },
      {
        pagelist: 'blog',
        action: action_btn
      },
      {
        pagelist: 'influencer-program',
        action: action_btn
      },
      {
        pagelist: 'about',
        action: action_btn
      },
      {
        pagelist: 'gifts',
        action: action_btn
      },
      {
        pagelist: 'careers',
        action: action_btn
      }
    ]);
  }, []);
  const action_btn = (
    <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
      <Tooltip title="Edit" arrow>
        <Link to="/dfadmin/cms-edit">
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              DFnewLogger('Table/edit_action');
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Link>
      </Tooltip>
    </div>
  );
  const columns = [
    {
      accessorKey: 'pagelist',
      header: 'Page List'
    },
    {
      accessorKey: 'action',
      header: 'Action'
    }
  ];
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Page Listing</Typography>
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

export default CMSList;
