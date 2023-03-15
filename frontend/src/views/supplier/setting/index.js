import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { Tabs } from 'antd';
import Total from './Total';

const Setting = () => {
  const pageItems = ['Profile', 'Password'];

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfsupplier" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link current">Setting</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Setting</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Tabs
          type="card"
          items={pageItems.map((item, index) => {
            return {
              label: item,
              key: index,
              children: <Total value={index} />
            };
          })}
        />
      </Paper>
    </>
  );
};

export default Setting;
