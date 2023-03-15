import { useRoutes } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';
import InventoryRoutes from './InventoryRoutes';
import SupplierRoutes from './SupplierRoutes';

export default function ThemeRoutes() {
  return useRoutes([AdminRoutes, InventoryRoutes, SupplierRoutes, UserRoutes]);
}
