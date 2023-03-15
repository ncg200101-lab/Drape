import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

const now = new Date();
const year = now.getFullYear();

const Copyright = () => {
  return (
    <>
      <Grid className="copyright" container>
        <Grid item xs={12} md={6}>
          <Typography
            className="copyright-text"
            sx={{ textAlign: { xs: 'center', md: 'start' } }}
          >
            &copy; {`${year}`} DRAPE FIT INC. ALL RIGHTS RESERVED.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            className="copyright-text"
            sx={{ textAlign: { xs: 'center', md: 'end' } }}
          >
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
            &nbsp;|&nbsp;
            <Link to="/privacy-policy">Privacy Policy</Link>
            &nbsp;|&nbsp;
            <Link to="/sitemap">Sitemap</Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Copyright;
