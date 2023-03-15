import { Link } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import Quill from 'ui-component/Quill';

const CMSEdit = () => {
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Page Listing</Typography>
        <Link to="/dfadmin" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Quill />
      </Paper>
    </>
  );
};

export default CMSEdit;
