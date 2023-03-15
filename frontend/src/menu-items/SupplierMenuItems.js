import { IconDashboard } from '@tabler/icons';

const icons = { IconDashboard };

const SupplierMenuItems = {
  items: [
    {
      id: 'supplier',
      title: 'Supplier',
      type: 'group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/dfsupplier',
          icon: icons.IconDashboard,
          breadcrumbs: false
        },
        {
          id: 'manage-product-category',
          title: 'Manage Product Category',
          type: 'item',
          url: '/dfsupplier/manage-product-category',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'manage-product',
          title: 'Manage Product',
          type: 'item',
          url: '/dfsupplier/manage-product',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'product-used-details',
          title: 'Product Used Details',
          type: 'item',
          url: '/dfsupplier/product-used-details',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'product-used-summary',
          title: 'Product Used Summary',
          type: 'item',
          url: '/dfsupplier/product-used-summary',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'setting',
          title: 'Setting',
          type: 'item',
          url: '/dfsupplier/setting',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'logout',
          title: 'Logout',
          type: 'logout',
          url: '/dfsupplier/logout',
          icon: icons.IconTypography,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default SupplierMenuItems;
