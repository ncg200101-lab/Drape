import { IconDashboard } from '@tabler/icons';

const icons = { IconDashboard };

const InventoryMenuItems = {
  items: [
    {
      id: 'inventory',
      title: 'Inventory',
      type: 'group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/dfinventory',
          icon: icons.IconDashboard,
          breadcrumbs: false
        },
        {
          id: 'brand',
          title: 'Brand',
          type: 'collapse',
          icon: icons.IconWindmill,
          children: [
            {
              id: 'create-brand',
              title: 'Create Brand',
              type: 'item',
              url: '/dfinventory/brand/create-brand',
              breadcrumbs: false
            },
            {
              id: 'view-brand',
              title: 'View Brand',
              type: 'item',
              url: '/dfinventory/brand/view-brand',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'manual-return-product',
          title: 'Manual Return Product',
          type: 'item',
          url: '/dfinventory/manual-return-product',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'add-product',
          title: 'Add Product',
          type: 'item',
          url: '/dfinventory/add-product/men',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'product-list',
          title: 'Product List',
          type: 'item',
          url: '/dfinventory/product-list',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'manage-category',
          title: 'Manage Category',
          type: 'collapse',
          icon: icons.IconWindmill,
          children: [
            {
              id: 'product-category',
              title: 'Product Category',
              type: 'item',
              url: '/dfinventory/manage-category/product-category',
              breadcrumbs: false
            },
            {
              id: 'product-sub-category',
              title: 'Product SubCategory',
              type: 'item',
              url: '/dfinventory/manage-category/product-sub-category',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'report',
          title: 'Report',
          type: 'collapse',
          icon: icons.IconWindmill,
          children: [
            {
              id: 'inventory-report',
              title: 'Inventory Report',
              type: 'item',
              url: '/dfinventory/report/inventory-report',
              breadcrumbs: false
            },
            {
              id: 'inventory-summary',
              title: 'Inventory Summary',
              type: 'item',
              url: '/dfinventory/report/inventory-summary',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'manage-color',
          title: 'Manage Color',
          type: 'item',
          url: '/dfinventory/manage-color',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'setting',
          title: 'Setting',
          type: 'item',
          url: '/dfinventory/setting',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'logout',
          title: 'Logout',
          type: 'logout',
          url: '/dfinventory/logout',
          icon: icons.IconTypography,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default InventoryMenuItems;
