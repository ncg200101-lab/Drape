import { IconDashboard } from '@tabler/icons';

const icons = { IconDashboard };

const AdminMenuItems = {
  items: [
    {
      id: 'admin',
      title: 'Admin',
      type: 'group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/dfadmin/dashboard',
          icon: icons.IconDashboard,
          breadcrumbs: false
        },
        {
          id: 'influencer',
          title: 'Influencer',
          type: 'item',
          url: '/dfadmin/influencer',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'employee',
          title: 'Employee',
          type: 'collapse',
          icon: icons.IconWindmill,
          children: [
            {
              id: 'create-employee',
              title: 'Create Employee',
              type: 'item',
              url: '/dfadmin/employee/create-employee',
              breadcrumbs: false
            },
            {
              id: 'view-employee',
              title: 'View Employee',
              type: 'item',
              url: '/dfadmin/employee/view-employee',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'customer',
          title: 'Customer',
          type: 'collapse',
          icon: icons.IconWindmill,
          children: [
            {
              id: 'not-paid-list',
              title: 'Not Paid List',
              type: 'item',
              url: '/dfadmin/customer/not-paid-list',
              breadcrumbs: false
            },
            {
              id: 'paid-list',
              title: 'Paid List',
              type: 'item',
              url: '/dfadmin/customer/paid-list',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'manage-sales-tax',
          title: 'Manage Sales tax',
          type: 'item',
          url: '/dfadmin/manage-sales-tax',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'cms-list',
          title: 'CMS List',
          type: 'item',
          url: '/dfadmin/cms-list',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'social-media',
          title: 'Social Media',
          type: 'item',
          url: '/dfadmin/social-media',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'exchange-products',
          title: 'Exchange Products',
          type: 'item',
          url: '/dfadmin/exchange-products',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'previous-work-list',
          title: 'Previous Work List',
          type: 'item',
          url: '/dfadmin/previous-work-list',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'declined-products',
          title: 'Declined Products',
          type: 'item',
          url: '/dfadmin/declined-products',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'scan-products',
          title: 'Scan Products',
          type: 'item',
          url: '/dfadmin/scan-products',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'setting',
          title: 'Setting',
          type: 'item',
          url: '/dfadmin/setting',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'promocode-setting',
          title: 'Promocode Setting',
          type: 'item',
          url: '/dfadmin/promocode-setting',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'offer-promocode',
          title: 'Offer Promocode',
          type: 'item',
          url: '/dfadmin/offer-promocode',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'gift-code',
          title: 'Gift Code',
          type: 'collapse',
          icon: icons.IconWindmill,
          children: [
            {
              id: 'gift-code-from-admin',
              title: 'Gift Code From Admin',
              type: 'item',
              url: '/dfadmin/gift-code/gift-code-from-admin',
              breadcrumbs: false
            },
            {
              id: 'gift-code-email',
              title: 'Gift Code Email',
              type: 'item',
              url: '/dfadmin/gitf-code/gift-code-email',
              breadcrumbs: false
            },
            {
              id: 'gift-code-mail',
              title: 'Gift Code Mail',
              type: 'item',
              url: '/dfadmin/gift-code/gift-code-mail',
              icon: icons.IconTypography,
              breadcrumbs: false
            },
            {
              id: 'gift-code-print',
              title: 'Gift Code Print',
              type: 'item',
              url: '/dfadmin/gift-code/gift-code-print',
              icon: icons.IconTypography,
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'empty-all-tables',
          title: 'Empty All Tables',
          type: 'item',
          url: '/dfadmin/empty-all-tables',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'customer-report',
          title: 'Customer Report',
          type: 'collapse',
          icon: icons.IconWindmill,
          children: [
            {
              id: 'subscription-cancellation',
              title: 'Subscription Cancellation',
              type: 'item',
              url: '/dfadmin/customer-report/subscription-cancellation',
              breadcrumbs: false
            },
            {
              id: 'block-customer-list',
              title: 'Block Customer List',
              type: 'item',
              url: '/dfadmin/customer-report/block-customer-list',
              breadcrumbs: false
            },
            {
              id: 'junk-user-list',
              title: 'Junk User List',
              type: 'item',
              url: '/dfadmin/customer-report/junk-user-list',
              breadcrumbs: false
            },
            {
              id: 'payment-refund',
              title: 'Payment Refund',
              type: 'item',
              url: '/dfadmin/customer-report/payment-refund',
              breadcrumbs: false
            },
            {
              id: 'payment-refundlist',
              title: 'Payment Refundlist',
              type: 'item',
              url: '/dfadmin/customer-report/payment-refundlist',
              breadcrumbs: false
            },
            {
              id: 'charge-client',
              title: 'Charge Client',
              type: 'item',
              url: '/dfadmin/customer-report/charge-client',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'career',
          title: 'Career',
          type: 'collapse',
          icon: icons.IconWindmill,
          children: [
            {
              id: 'add-career',
              title: 'Add Career',
              type: 'item',
              url: '/dfadmin/career/add-career',
              breadcrumbs: false
            },
            {
              id: 'view-career',
              title: 'View Career',
              type: 'item',
              url: '/dfadmin/career/view-career',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'manage-blog',
          title: 'Manage Blog',
          type: 'collapse',
          icon: icons.IconWindmill,
          children: [
            {
              id: 'category',
              title: 'Category',
              type: 'item',
              url: '/dfadmin/manage-blog/category',
              breadcrumbs: false
            },
            {
              id: 'blog',
              title: 'Blog',
              type: 'item',
              url: '/dfadmin/manage-blog/blog',
              breadcrumbs: false
            },
            {
              id: 'blog-tag',
              title: 'Blog Tag',
              type: 'item',
              url: '/dfadmin/manage-blog/blog-tag',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'news',
          title: 'News',
          type: 'item',
          url: '/dfadmin/news',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'prediction',
          title: 'Prediction',
          type: 'item',
          url: '/dfadmin/prediction',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'report',
          title: 'Report',
          type: 'collapse',
          icon: icons.IconWindmill,
          children: [
            {
              id: 'auto-checkout-list',
              title: 'Auto Checkout List',
              type: 'item',
              url: '/dfadmin/report/auto-checkout-list',
              breadcrumbs: false
            },
            {
              id: 'all-customers',
              title: 'All Customers',
              type: 'item',
              url: '/dfadmin/report/all-customers',
              breadcrumbs: false
            },
            {
              id: 'customer-not-paid-list',
              title: 'Customer Not Paid List',
              type: 'item',
              url: '/dfadmin/report/customer-not-paid-list',
              breadcrumbs: false
            },
            {
              id: 'customer-paid-list',
              title: 'Customer Paid List',
              type: 'item',
              url: '/dfadmin/report/customer-paid-list',
              breadcrumbs: false
            },
            {
              id: 'previous-list',
              title: 'Previous List',
              type: 'item',
              url: '/dfadmin/report/previous-list',
              breadcrumbs: false
            },
            {
              id: 'stylist-wise',
              title: 'Stylist Wise',
              type: 'item',
              url: '/dfadmin/report/stylist-wise',
              breadcrumbs: false
            },
            {
              id: 'state-wise',
              title: 'State Wise',
              type: 'item',
              url: '/dfadmin/report/state-wise',
              breadcrumbs: false
            },
            {
              id: 'subscriptions',
              title: 'Subscriptions',
              type: 'item',
              url: '/dfadmin/report/subscriptions',
              breadcrumbs: false
            },
            {
              id: 'batch-process-reports',
              title: 'Batch Process Reports',
              type: 'item',
              url: '/dfadmin/report/batch-process-reports',
              breadcrumbs: false
            },
            {
              id: 'batch-process-subscription',
              title: 'Batch Process Subscription',
              type: 'item',
              url: '/dfadmin/report/batch-process-subscription',
              breadcrumbs: false
            },
            {
              id: 'clients-birthday',
              title: 'Clients Birthday',
              type: 'item',
              url: '/dfadmin/report/clients-birthday',
              breadcrumbs: false
            },
            {
              id: 'not-checked-out-customer',
              title: 'Not Checked Out Customer',
              type: 'item',
              url: '/dfadmin/report/not-checked-out-customer',
              breadcrumbs: false
            },
            {
              id: 'return-not-processed',
              title: 'Return Not Processed',
              type: 'item',
              url: '/dfadmin/report/return-not-processed',
              breadcrumbs: false
            },
            {
              id: 'checked-out-product-detail',
              title: 'Checked Out Product Detail',
              type: 'item',
              url: '/dfadmin/report/checked-out-product-detail',
              breadcrumbs: false
            },
            {
              id: 'product-assigned-but-not-finalized',
              title: 'Product Assigned But Not Finalized',
              type: 'item',
              url: '/dfadmin/report/product-assigned-but-not-finalized',
              breadcrumbs: false
            },
            {
              id: 'list-of-products-not-returned',
              title: 'List Of Products Not Returned',
              type: 'item',
              url: '/dfadmin/report/list-of-products-not-returned',
              breadcrumbs: false
            },
            {
              id: 'monthly-sales',
              title: 'Monthly Sales',
              type: 'item',
              url: '/dfadmin/report/monthly-sales',
              breadcrumbs: false
            },
            {
              id: 'monthly-loss',
              title: 'Monthly Loss',
              type: 'item',
              url: '/dfadmin/report/monthly-loss',
              breadcrumbs: false
            },
            {
              id: 'monthly-revenue',
              title: 'Monthly Revenue',
              type: 'item',
              url: '/dfadmin/report/monthly-revenue',
              breadcrumbs: false
            },
            {
              id: 'total-products-in-inventory',
              title: 'Total Products In Inventory',
              type: 'item',
              url: '/dfadmin/report/total-products-in-inventory',
              breadcrumbs: false
            },
            {
              id: 'monthly-product-shipped[inventory]',
              title: 'Monthly Product Shipped[Inventory]',
              type: 'item',
              url: '/dfadmin/report/monthly-product-shipped[inventory]',
              breadcrumbs: false
            },
            {
              id: 'monthly-client-consumed',
              title: 'Monthly Client Consumed',
              type: 'item',
              url: '/dfadmin/report/monthly-client-consumed',
              breadcrumbs: false
            },
            {
              id: 'monthly-product-not-returned',
              title: 'Monthly Product Not Returned',
              type: 'item',
              url: '/dfadmin/report/monthly-product-not-returned',
              breadcrumbs: false
            },
            {
              id: 'monthly-product-declined',
              title: 'Monthly Product Declined',
              type: 'item',
              url: '/dfadmin/report/monthly-product-declined',
              breadcrumbs: false
            },
            {
              id: 'product-finalize-summary',
              title: 'Product-finalize Summary',
              type: 'item',
              url: '/dfadmin/report/product-finalize-summary',
              breadcrumbs: false
            },
            {
              id: 'product-finalize-details',
              title: 'Product-finalize Details',
              type: 'item',
              url: '/dfadmin/report/product-finalize-details',
              breadcrumbs: false
            },
            {
              id: 'client-checkedout-summary',
              title: 'Client-checkedout Summary',
              type: 'item',
              url: '/dfadmin/report/client-checkedout-summary',
              breadcrumbs: false
            },
            {
              id: 'client-checkedout-details',
              title: 'Client-checkedout Details',
              type: 'item',
              url: '/dfadmin/report/client-checkedout-details',
              breadcrumbs: false
            },
            {
              id: 'not-checkedout-summary',
              title: 'Not Checkedout Summary',
              type: 'item',
              url: '/dfadmin/report/not-checkedout-summary',
              breadcrumbs: false
            },
            {
              id: 'not-checkedout-details',
              title: 'Not Checkedout Details',
              type: 'item',
              url: '/dfadmin/report/not-checkedout-details',
              breadcrumbs: false
            },
            {
              id: 'checkedout-return-summary',
              title: 'Checkedout Return Summary',
              type: 'item',
              url: '/dfadmin/report/checkedout-return-summary',
              breadcrumbs: false
            },
            {
              id: 'checkedout-return-details',
              title: 'Checkedout Return Details',
              type: 'item',
              url: '/dfadmin/report/checkedout-return-details',
              breadcrumbs: false
            },
            {
              id: 'checkedout-not-return-summary',
              title: 'Checkedout Not Return Summary',
              type: 'item',
              url: '/dfadmin/report/checkedout-not-return-summary',
              breadcrumbs: false
            },
            {
              id: 'checkedout-not-return-details',
              title: 'Checkedout Not Return Details',
              type: 'item',
              url: '/dfadmin/report/checkedout-not-return-details',
              breadcrumbs: false
            },
            {
              id: 'product-declined-summary',
              title: 'Product Declined Summary',
              type: 'item',
              url: '/dfadmin/report/product-declined-summary',
              breadcrumbs: false
            },
            {
              id: 'product-declined-details',
              title: 'Product Declined Details',
              type: 'item',
              url: '/dfadmin/report/product-declined-details',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'master-summary-report',
          title: 'Master Summary Report',
          type: 'collapse',
          icon: icons.IconWindmill,
          children: [
            {
              id: 'finalized-shiped-summary-report',
              title: 'Finalized / Shipped Summary Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/finalized-shipped-summary-report',
              breadcrumbs: false
            },
            {
              id: 'finalized-shipped-details-report',
              title: 'Finalized / Shipped Details Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/finalized-shipped-details-report',
              breadcrumbs: false
            },
            {
              id: 'checkout-summary-report',
              title: 'Checkout Summary Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/checkout-summary-report',
              breadcrumbs: false
            },
            {
              id: 'checkout-details-report',
              title: 'Checkout Details Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/checkout-details-report',
              breadcrumbs: false
            },
            {
              id: 'not-checkout-summary-report',
              title: 'Not Checkout Summary Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/not-checkout-summary-report',
              breadcrumbs: false
            },
            {
              id: 'not-checkout-details-report',
              title: 'Not Checkout Details Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/not-checkout-details-report',
              breadcrumbs: false
            },
            {
              id: 'not-return-summary-report',
              title: 'Not Return Summary Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/not-return-summary-report',
              breadcrumbs: false
            },
            {
              id: 'not-return-details-report',
              title: 'Not Return Details Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/not-return-details-report',
              breadcrumbs: false
            },
            {
              id: 'return-processed-summary-report',
              title: 'Return Processed Summary Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/return-processed-summary-report',
              breadcrumbs: false
            },
            {
              id: 'return-processed-details-report',
              title: 'Return Processed Details Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/return-processed-details-report',
              breadcrumbs: false
            },
            {
              id: 'exchange-processed-summary-report',
              title: 'Exchange Processed Summary Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/exchange-processed-summary-report',
              breadcrumbs: false
            },
            {
              id: 'exchange-processed-details-report',
              title: 'Exchange Processed Details Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/exchange-processed-details-report',
              breadcrumbs: false
            },
            {
              id: 'not-return-exchange-summary-report',
              title: 'Not Return Exchange Summary Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/not-return-exchange-summary-report',
              breadcrumbs: false
            },
            {
              id: 'not-return-exchange-details-report',
              title: 'Not Return Exchange Details Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/not-return-exchange-details-report',
              breadcrumbs: false
            },
            {
              id: 'decline-summary-report',
              title: 'Decline Summary Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/decline-summary-report',
              breadcrumbs: false
            },
            {
              id: 'decline-details-report',
              title: 'Decline Details Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/decline-details-report',
              breadcrumbs: false
            },
            {
              id: 'styling-fee-report',
              title: 'Styling Fee Report',
              type: 'item',
              url: '/dfadmin/master-summary-report/styling-fee-report',
              breadcrumbs: false
            },
            {
              id: 'change-auto-checkout-date',
              title: 'Change Auto Checkout Date',
              type: 'item',
              url: '/dfadmin/master-summary-report/change-auto-checkout-date',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'master-support-report',
          title: 'Master Support Report',
          type: 'collapse',
          icon: icons.IconWindmill,
          children: [
            {
              id: 'customer-paid-list',
              title: 'Customer Paid List',
              type: 'item',
              url: '/dfadmin/master-support-report/customer-paid-list',
              breadcrumbs: false
            },
            {
              id: 'previous-work-list',
              title: 'Previous Work List',
              type: 'item',
              url: '/dfadmin/master-support-report/previous-work-list',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'finance-report',
          title: 'Finance Report',
          type: 'collapse',
          icon: icons.IconWindmill,
          children: [
            {
              id: 'defaulter-customer-list',
              title: 'Defaulter Customer List',
              type: 'item',
              url: '/dfadmin/finance-report/default-customer-list',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'logout',
          title: 'Logout',
          type: 'logout',
          url: '/dfadmin/logout',
          icon: icons.IconTypography,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default AdminMenuItems;
