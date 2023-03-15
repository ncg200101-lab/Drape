import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

import NavGroup from './NavGroup';
import AdminMenuItems from 'menu-items/AdminMenuItems';
import SupplierMenuItems from 'menu-items/SupplierMenuItems';
import InventoryMenuItems from 'menu-items/InventoryMenuItems';
import { useSelector } from 'react-redux';

const MenuList = () => {
  const location = useLocation();
  let SupperAdminMenuItems = AdminMenuItems;
  if (location.pathname.includes('/dfadmin')) {
    SupperAdminMenuItems = AdminMenuItems;
  } else if (location.pathname.includes('/dfinventory')) {
    SupperAdminMenuItems = InventoryMenuItems;
  } else {
    SupperAdminMenuItems = SupplierMenuItems;
  }
  const { user } = useSelector((state) => state.auth);
  const MenuItems =
    user?.role === 100
      ? SupperAdminMenuItems
      : user?.role === 101
      ? AdminMenuItems
      : user?.role === 103
      ? SupplierMenuItems
      : user?.role === 104
      ? InventoryMenuItems
      : { items: [] };
  const navItems = MenuItems.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
