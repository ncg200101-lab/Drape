import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ComponentLoader from 'utils/ComponentLoader';
import InventoryPrivateRoutes from 'utils/InventoryPrivateRoutes';

const Dashboard = Loadable(
  lazy(() => ComponentLoader(() => import('views/inventory/dashboard')))
);
const MenProduct = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/inventory/add-product/MenProduct'))
  )
);
const WomenProduct = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/inventory/add-product/WomenProduct'))
  )
);
const GirlProduct = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/inventory/add-product/GirlProduct'))
  )
);
const BoyProduct = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/inventory/add-product/BoyProduct'))
  )
);
const CreateBrand = Loadable(
  lazy(() => ComponentLoader(() => import('views/inventory/brand/CreateBrand')))
);
const ViewBrand = Loadable(
  lazy(() => ComponentLoader(() => import('views/inventory/brand/ViewBrand')))
);
const ProductCategory = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/inventory/manage-category/ProductCategory')
    )
  )
);
const ProductSubCategory = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/inventory/manage-category/ProductSubCategory')
    )
  )
);
const ManageColor = Loadable(
  lazy(() => ComponentLoader(() => import('views/inventory/manage-color')))
);
const ManualReturnProduct = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/inventory/manual-return-product/ManualReturnProduct')
    )
  )
);
const AddProductForMen = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/inventory/manual-return-product/AddProductForMen')
    )
  )
);
const ProductList = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/inventory/product-list/ProductList'))
  )
);
const IndividualProduct = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/inventory/product-list/IndividualProduct')
    )
  )
);
const InventoryReport = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/inventory/report/InventoryReport'))
  )
);
const InventorySummary = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/inventory/report/InventorySummary'))
  )
);
const Setting = Loadable(
  lazy(() => ComponentLoader(() => import('views/inventory/setting')))
);

const SupplierRoutes = {
  path: '/dfinventory',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <InventoryPrivateRoutes component={Dashboard} />
    },
    {
      path: 'add-product/men',
      element: <InventoryPrivateRoutes component={MenProduct} />
    },
    {
      path: 'edit-product/men',
      element: <InventoryPrivateRoutes component={MenProduct} />
    },
    {
      path: 'add-product/women',
      element: <InventoryPrivateRoutes component={WomenProduct} />
    },
    {
      path: 'edit-product/women',
      element: <InventoryPrivateRoutes component={WomenProduct} />
    },
    {
      path: 'add-product/boy',
      element: <InventoryPrivateRoutes component={BoyProduct} />
    },
    {
      path: 'edit-product/boy',
      element: <InventoryPrivateRoutes component={BoyProduct} />
    },
    {
      path: 'add-product/girl',
      element: <InventoryPrivateRoutes component={GirlProduct} />
    },
    {
      path: 'edit-product/girl',
      element: <InventoryPrivateRoutes component={GirlProduct} />
    },
    {
      path: 'brand/create-brand',
      element: <InventoryPrivateRoutes component={CreateBrand} />
    },
    {
      path: 'brand/view-brand',
      element: <InventoryPrivateRoutes component={ViewBrand} />
    },
    {
      path: 'manage-category/product-category',
      element: <InventoryPrivateRoutes component={ProductCategory} />
    },
    {
      path: 'manage-category/product-sub-category/:id?',
      element: <InventoryPrivateRoutes component={ProductSubCategory} />
    },
    {
      path: 'manage-color',
      element: <InventoryPrivateRoutes component={ManageColor} />
    },
    {
      path: 'manual-return-product',
      element: <InventoryPrivateRoutes component={ManualReturnProduct} />
    },
    {
      path: 'add-manual-product',
      element: <InventoryPrivateRoutes component={AddProductForMen} />
    },
    {
      path: 'product-list',
      element: <InventoryPrivateRoutes component={ProductList} />
    },
    {
      path: 'product-list/individual',
      element: <InventoryPrivateRoutes component={IndividualProduct} />
    },
    {
      path: 'report/inventory-report',
      element: <InventoryPrivateRoutes component={InventoryReport} />
    },
    {
      path: 'report/inventory-summary',
      element: <InventoryPrivateRoutes component={InventorySummary} />
    },
    {
      path: 'setting',
      element: <InventoryPrivateRoutes component={Setting} />
    }
  ]
};

export default SupplierRoutes;
