import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Typography, Box, Button } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const DividerImg = GenS3Link('landing/images/client/divider-img');

const HowItWorks = ({ propsValue }) => {
  return (
    <>
      <Grid className="global-padding" container spacing={4}>
        <Grid item xs={12}>
          <Typography className="about-title">
            HOW IT <strong>WORKS</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className="h-align-center" sx={{ margin: '-20px 0 10px' }}>
            <DFnewImgTag
              src={`${DividerImg}.webp`}
              fallback={`${DividerImg}.png`}
              height="19"
              lzheight={19}
              alt="divider"
            />
          </Box>
        </Grid>
        {propsValue.map((item, index) => (
          <Grid key={index} className="how-it-item" item xs={12} md={4}>
            <Box className="item-round-image">
              <Typography className="item-num">{item.number}</Typography>
              <Box className="item-image-box">
                <DFnewImgTag
                  className="item-image"
                  src={`${item.image}.webp`}
                  fallback={`${item.image}.jpg`}
                  height="128"
                  lzheight={128}
                  alt="Item Round Image"
                />
              </Box>
            </Box>
            <Typography className="item-title">{item.title}</Typography>
            <Typography className="item-content">{item.content}</Typography>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Box className="h-align-center">
            <Button
              className="finally-sign-btn"
              style={{
                fontSize: '16px',
                padding: '10px 50px'
              }}
              to="/signup"
            >
              Take your style quiz
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '-32px' }}>
          <Typography className="finally-sign-account">
            Already a member?{' '}
            <Link className="finally-sign-link" to="/login">
              Sign in
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

HowItWorks.propTypes = {
  propsValue: PropTypes.array
};

export default HowItWorks;
