import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'utils/Constant';
import PopularCard from './PopularCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import TotalNumOfTotalBrandStaff from './TotalNumOfTotalBrandStaff';
import TotalNumOfActiveBrandStaff from './TotalNumOfActiveBrandStaff';
import TotalNumOfInactiveBrandStaff from './TotalNumOfInactiveBrandStaff';
import { useDispatch, useSelector } from 'react-redux';
import { getCount } from 'actions/invBrand';

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCount());
    setLoading(false);
  }, []);
  const { count } = useSelector((state) => state.invBrand);
  console.log(count);
  const [isLoading, setLoading] = useState(true);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalNumOfTotalBrandStaff
              isLoading={isLoading}
              count={count?.countTotal}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalNumOfActiveBrandStaff
              isLoading={isLoading}
              count={count?.countActive}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalNumOfInactiveBrandStaff
              isLoading={isLoading}
              count={count?.countInactive}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
