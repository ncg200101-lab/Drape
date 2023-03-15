import { Box, Typography } from '@mui/material';

const now = new Date();
const year = now.getFullYear();

const AdminFooter = () => {
  return (
    <Box className="admin-footer">
      <Typography
        className="copyright-text"
        sx={{ textAlign: { xs: 'center', md: 'start' } }}
      >
        &copy; {`${year}`} DRAPE FIT INC. ALL RIGHTS RESERVED.
      </Typography>
    </Box>
  );
};

export default AdminFooter;
