import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Typography } from '@mui/material';

import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';
import { logout } from 'actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const NavGroup = ({ item }) => {
  const dispatch = useDispatch();

  //-- menu list collapse & items
  const items = item.children?.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      case 'logout':
        return (
          <Typography
            key={menu.id}
            onClick={() => dispatch(logout())}
            className="sidebar-logout"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            &nbsp;Logout
          </Typography>
        );
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
      // subheader={
      //   item.title && (
      //     <Typography
      //       variant="caption"
      //       sx={{ ...theme.typography.menuCaption }}
      //       display="block"
      //       gutterBottom
      //     >
      //       {item.title}
      //       {item.caption && (
      //         <Typography
      //           variant="caption"
      //           sx={{ ...theme.typography.subMenuCaption }}
      //           display="block"
      //           gutterBottom
      //         >
      //           {item.caption}
      //         </Typography>
      //       )}
      //     </Typography>
      //   )
      // }
      >
        {items}
      </List>

      {/* group divider */}
      {/* <Divider sx={{ mt: 0.25, mb: 1.25 }} /> */}
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
