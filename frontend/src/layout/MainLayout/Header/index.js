import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  ButtonBase,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { IconMenu2 } from '@tabler/icons';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import NotificationSection from './NotificationSection';
import SearchSection from './SearchSection';

const Logo = GenS3Link('landing/images/logo_full');
const LogoSmall = GenS3Link('landing/images/logo');

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box
        sx={{
          width: 228,
          display: 'flex'
          // [theme.breakpoints.down('md')]: {
          //   width: 'auto'
          // }
        }}
      >
        <Box
          component="span"
          sx={{
            display: 'block',
            flexGrow: 1
          }}
        >
          <Link to="/" className="v-align-center">
            <DFnewImgTag
              src={matchDownSM ? `${LogoSmall}.webp` : `${Logo}.webp`}
              fallback={matchDownSM ? `${LogoSmall}.png` : `${Logo}.png`}
              height="44"
              lzheight={44}
              alt="Drape Fit Admin"
            />
          </Link>
        </Box>
        <ButtonBase sx={{ borderRadius: '8px', overflow: 'hidden' }}>
          <Avatar
            className="header-btn-toggle"
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .25s ease-in-out'
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <NotificationSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
