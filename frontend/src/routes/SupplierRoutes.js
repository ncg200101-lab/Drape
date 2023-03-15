import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ComponentLoader from 'utils/ComponentLoader';
import SupplierPrivateRoutes from 'utils/SupplierPrivateRoutes';

const Dashboard = Loadable(
  lazy(() => ComponentLoader(() => import('views/supplier/dashboard')))
);
const ManageProductCategory = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/supplier/manage-product-category'))
  )
);
const ManageProduct = Loadable(
  lazy(() => ComponentLoader(() => import('views/supplier/manage-product')))
);
const ProductUsedDetails = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/supplier/product-used-details'))
  )
);
const ProductUsedSummary = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/supplier/product-used-summary'))
  )
);
const Setting = Loadable(
  lazy(() => ComponentLoader(() => import('views/supplier/setting')))
);

const SupplierRoutes = {
  path: '/dfsupplier',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <SupplierPrivateRoutes component={Dashboard} />
    },
    {
      path: 'manage-product-category',
      element: <SupplierPrivateRoutes component={ManageProductCategory} />
    },
    {
      path: 'manage-product',
      element: <SupplierPrivateRoutes component={ManageProduct} />
    },
    {
      path: 'product-used-details',
      element: <SupplierPrivateRoutes component={ProductUsedDetails} />
    },
    {
      path: 'product-used-summary',
      element: <SupplierPrivateRoutes component={ProductUsedSummary} />
    },
    {
      path: 'setting',
      element: <SupplierPrivateRoutes component={Setting} />
    }
  ]
};

export default SupplierRoutes;
