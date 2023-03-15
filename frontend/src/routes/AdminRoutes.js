import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ComponentLoader from 'utils/ComponentLoader';
import AdminPrivateRoutes from 'utils/AdminPrivateRoutes';

const Dashboard = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/dashboard')))
);
const Influencer = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/influencer')))
);
const ManageSalesTax = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/manage-sales-tax')))
);
const CreateEmployee = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/employee/CreateEmployee'))
  )
);
const ViewEmployee = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/employee/ViewEmployee')))
);
const SocialMedia = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/social-media')))
);
const NotPaidList = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/customer/NotPaidList')))
);
const NotPaidEmail = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer/email/NotPaidEmail'))
  )
);
const MenView = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/customer/view/MenView')))
);
const WomenView = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer/view/WomenView'))
  )
);
const GirlView = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer/view/GirlView'))
  )
);
const BoyView = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/customer/view/BoyView')))
);
const PaidList = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/customer/PaidList')))
);
const PaidEmail = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer/email/PaidEmail'))
  )
);
const PaidPrevWork = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer/paid/PrevWork'))
  )
);
const PaidPrevOrder = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer/paid/PrevOrder'))
  )
);
const PaidBrowseAll = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer/paid/BrowseAll'))
  )
);
const PaidMatching = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer/paid/Matching'))
  )
);
const PaidCatelog = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/customer/paid/Catelog')))
);
const PaidOrderReceipt = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer/paid/OrderReceipt'))
  )
);
const PaidProductList = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer/paid/ProductList'))
  )
);
const PaidViewProduct = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer/paid/ViewProduct'))
  )
);
const PaidExtraProduct = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer/paid/ExtraProduct'))
  )
);

const CMSList = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/cms/CMSList')))
);
const CMSEdit = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/cms/CMSEdit')))
);
const ExchangeProducts = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/exchange-products')))
);
const DeclinedProducts = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/declined-products')))
);
const PreviousWorkList = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/previous-work-list')))
);
const ScanProducts = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/scan-products')))
);
const Setting = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/setting')))
);
const PromocodeSetting = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/promocode-setting')))
);
const OfferPromocode = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/offer-promocode')))
);
const EmptyAllTables = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/empty-all-tables')))
);
const News = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/news')))
);
const Prediction = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/prediction')))
);
const DefaultCustomerList = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/finance-report/DefaulterCustomerList')
    )
  )
);
const MasterCustomerPaidList = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-support-report/CustomerPaidList')
    )
  )
);
const MasterPreviousWorkList = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-support-report/PreviousWorkList')
    )
  )
);
const FinalShippedSmRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/FinalShippedSmRpt')
    )
  )
);
const FinalShippedDtRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/FinalShippedDtRpt')
    )
  )
);
const ChangeAutoCheckDate = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/ChangeAutoCheckDate')
    )
  )
);
const CheckoutDtRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/CheckoutDtRpt')
    )
  )
);
const CheckoutSmRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/CheckoutSmRpt')
    )
  )
);
const DeclineDtRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/DeclineDtRpt')
    )
  )
);
const DeclineSmRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/DeclineSmRpt')
    )
  )
);
const ExchangeProcessedDtRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/ExchangeProcessedDtRpt')
    )
  )
);
const ExchangeProcessedSmRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/ExchangeProcessedSmRpt')
    )
  )
);
const NotCheckoutDtRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/NotCheckoutDtRpt')
    )
  )
);
const NotCheckoutSmRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/NotCheckoutSmRpt')
    )
  )
);
const NotReturnDtRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/NotReturnDtRpt')
    )
  )
);
const NotReturnSmRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/NotReturnSmRpt')
    )
  )
);
const NotRtExDtRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/NotRtExDtRpt')
    )
  )
);
const NotRtExSmRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/NotRtExSmRpt')
    )
  )
);
const ReturnProcessedDtRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/ReturnProcessedDtRpt')
    )
  )
);
const ReturnProcessedSmRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/ReturnProcessedSmRpt')
    )
  )
);
const StylingFeeRpt = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/master-summary-report/StylingFeeRpt')
    )
  )
);
const GiftCodeAdmin = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/gift-code/admin')))
);
const GiftCodeEmail = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/gift-code/email')))
);
const GiftCodeMail = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/gift-code/mail')))
);
const GiftCodePrint = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/gift-code/print')))
);
const CreateCareer = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/career/CreateCareer')))
);
const ViewCareer = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/career/ViewCareer')))
);
const Category = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/manage-blog/Category')))
);
const Blog = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/manage-blog/Blog')))
);
const BlogTag = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/manage-blog/BlogTag')))
);
const SubscriptionCancellation = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/customer-report/SubscriptionCancellation')
    )
  )
);
const BlockCustomerList = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/customer-report/BlockCustomerList')
    )
  )
);
const JunkUserList = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer-report/JunkUserList'))
  )
);
const PaymentRefund = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer-report/PaymentRefund'))
  )
);
const PaymentRefundListing = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/admin/customer-report/PaymentRefundListing')
    )
  )
);
const ChargeClient = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/customer-report/ChargeClient'))
  )
);
const AutoCheckoutList = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/report/AutoCheckoutList'))
  )
);
const AllCustomers = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/AllCustomers')))
);
const CustomerNotPaidList = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/report/CustomerNotPaidList'))
  )
);
const CustomerPaidList = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/admin/report/CustomerPaidList'))
  )
);
const PreviousList = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/PreviousList')))
);

const AdminRoutes = {
  path: '/dfadmin',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      element: <AdminPrivateRoutes component={Dashboard} />
    },
    {
      path: 'influencer',
      element: <AdminPrivateRoutes component={Influencer} />
    },
    {
      path: 'manage-sales-tax',
      element: <AdminPrivateRoutes component={ManageSalesTax} />
    },
    {
      path: 'employee/create-employee',
      element: <AdminPrivateRoutes component={CreateEmployee} />
    },
    {
      path: 'employee/view-employee',
      element: <AdminPrivateRoutes component={ViewEmployee} />
    },
    {
      path: 'customer/paid-list',
      element: <AdminPrivateRoutes component={PaidList} />
    },
    {
      path: 'customer/paid-list/email',
      element: <AdminPrivateRoutes component={PaidEmail} />
    },
    {
      path: 'customer/paid-list/previous-work',
      element: <AdminPrivateRoutes component={PaidPrevWork} />
    },
    {
      path: 'customer/paid-list/previous-order',
      element: <AdminPrivateRoutes component={PaidPrevOrder} />
    },
    {
      path: 'customer/paid-list/browse-all',
      element: <AdminPrivateRoutes component={PaidBrowseAll} />
    },
    {
      path: 'customer/paid-list/matching',
      element: <AdminPrivateRoutes component={PaidMatching} />
    },
    {
      path: 'customer/paid-list/catelog',
      element: <AdminPrivateRoutes component={PaidCatelog} />
    },
    {
      path: 'customer/paid-list/order-receipt',
      element: <AdminPrivateRoutes component={PaidOrderReceipt} />
    },
    {
      path: 'customer/paid-list/product-list',
      element: <AdminPrivateRoutes component={PaidProductList} />
    },
    {
      path: 'customer/paid-list/product-list/view-product',
      element: <AdminPrivateRoutes component={PaidViewProduct} />
    },
    {
      path: 'customer/paid-list/extra-product',
      element: <AdminPrivateRoutes component={PaidExtraProduct} />
    },
    {
      path: 'customer/not-paid-list',
      element: <AdminPrivateRoutes component={NotPaidList} />
    },
    {
      path: 'customer/not-paid-list/email',
      element: <AdminPrivateRoutes component={NotPaidEmail} />
    },
    {
      path: 'customer/men-view',
      element: <AdminPrivateRoutes component={MenView} />
    },
    {
      path: 'customer/women-view',
      element: <AdminPrivateRoutes component={WomenView} />
    },
    {
      path: 'customer/girl-view',
      element: <AdminPrivateRoutes component={GirlView} />
    },
    {
      path: 'customer/boy-view',
      element: <AdminPrivateRoutes component={BoyView} />
    },
    {
      path: 'social-media',
      element: <AdminPrivateRoutes component={SocialMedia} />
    },
    {
      path: 'cms-list',
      element: <AdminPrivateRoutes component={CMSList} />
    },
    {
      path: 'cms-edit',
      element: <AdminPrivateRoutes component={CMSEdit} />
    },
    {
      path: 'exchange-products',
      element: <AdminPrivateRoutes component={ExchangeProducts} />
    },
    {
      path: 'declined-products',
      element: <AdminPrivateRoutes component={DeclinedProducts} />
    },
    {
      path: 'scan-products',
      element: <AdminPrivateRoutes component={ScanProducts} />
    },
    {
      path: 'previous-work-list',
      element: <AdminPrivateRoutes component={PreviousWorkList} />
    },
    {
      path: 'setting',
      element: <AdminPrivateRoutes component={Setting} />
    },
    {
      path: 'promocode-setting',
      element: <AdminPrivateRoutes component={PromocodeSetting} />
    },
    {
      path: 'offer-promocode',
      element: <AdminPrivateRoutes component={OfferPromocode} />
    },
    {
      path: 'empty-all-tables',
      element: <AdminPrivateRoutes component={EmptyAllTables} />
    },
    {
      path: 'news',
      element: <AdminPrivateRoutes component={News} />
    },
    {
      path: 'prediction',
      element: <AdminPrivateRoutes component={Prediction} />
    },
    {
      path: 'finance-report/default-customer-list',
      element: <AdminPrivateRoutes component={DefaultCustomerList} />
    },
    {
      path: 'master-support-report/customer-paid-list',
      element: <AdminPrivateRoutes component={MasterCustomerPaidList} />
    },
    {
      path: 'master-support-report/previous-work-list',
      element: <AdminPrivateRoutes component={MasterPreviousWorkList} />
    },
    {
      path: 'master-summary-report/finalized-shipped-summary-report',
      element: <AdminPrivateRoutes component={FinalShippedSmRpt} />
    },
    {
      path: 'master-summary-report/finalized-shipped-details-report',
      element: <AdminPrivateRoutes component={FinalShippedDtRpt} />
    },
    {
      path: 'master-summary-report/change-auto-checkout-date',
      element: <AdminPrivateRoutes component={ChangeAutoCheckDate} />
    },
    {
      path: 'master-summary-report/checkout-details-report',
      element: <AdminPrivateRoutes component={CheckoutDtRpt} />
    },
    {
      path: 'master-summary-report/checkout-summary-report',
      element: <AdminPrivateRoutes component={CheckoutSmRpt} />
    },
    {
      path: 'master-summary-report/decline-details-report',
      element: <AdminPrivateRoutes component={DeclineDtRpt} />
    },
    {
      path: 'master-summary-report/decline-summary-report',
      element: <AdminPrivateRoutes component={DeclineSmRpt} />
    },
    {
      path: 'master-summary-report/exchange-processed-details-report',
      element: <AdminPrivateRoutes component={ExchangeProcessedDtRpt} />
    },
    {
      path: 'master-summary-report/exchange-processed-summary-report',
      element: <AdminPrivateRoutes component={ExchangeProcessedSmRpt} />
    },
    {
      path: 'master-summary-report/not-checkout-details-report',
      element: <AdminPrivateRoutes component={NotCheckoutDtRpt} />
    },
    {
      path: 'master-summary-report/not-checkout-summary-report',
      element: <AdminPrivateRoutes component={NotCheckoutSmRpt} />
    },
    {
      path: 'master-summary-report/not-return-details-report',
      element: <AdminPrivateRoutes component={NotReturnDtRpt} />
    },
    {
      path: 'master-summary-report/not-return-summary-report',
      element: <AdminPrivateRoutes component={NotReturnSmRpt} />
    },
    {
      path: 'master-summary-report/not-return-exchange-details-report',
      element: <AdminPrivateRoutes component={NotRtExDtRpt} />
    },
    {
      path: 'master-summary-report/not-return-exchange-summary-report',
      element: <AdminPrivateRoutes component={NotRtExSmRpt} />
    },
    {
      path: 'master-summary-report/return-processed-details-report',
      element: <AdminPrivateRoutes component={ReturnProcessedDtRpt} />
    },
    {
      path: 'master-summary-report/return-processed-summary-report',
      element: <AdminPrivateRoutes component={ReturnProcessedSmRpt} />
    },
    {
      path: 'master-summary-report/styling-fee-report',
      element: <AdminPrivateRoutes component={StylingFeeRpt} />
    },
    {
      path: 'gift-code/gift-code-from-admin',
      element: <AdminPrivateRoutes component={GiftCodeAdmin} />
    },
    {
      path: 'gitf-code/gift-code-email',
      element: <AdminPrivateRoutes component={GiftCodeEmail} />
    },
    {
      path: 'gift-code/gift-code-mail',
      element: <AdminPrivateRoutes component={GiftCodeMail} />
    },
    {
      path: 'gift-code/gift-code-print',
      element: <AdminPrivateRoutes component={GiftCodePrint} />
    },
    {
      path: 'career/add-career',
      element: <AdminPrivateRoutes component={CreateCareer} />
    },
    {
      path: 'career/view-career',
      element: <AdminPrivateRoutes component={ViewCareer} />
    },
    {
      path: 'manage-blog/category',
      element: <AdminPrivateRoutes component={Category} />
    },
    {
      path: 'manage-blog/blog',
      element: <AdminPrivateRoutes component={Blog} />
    },
    {
      path: 'manage-blog/blog-tag',
      element: <AdminPrivateRoutes component={BlogTag} />
    },
    {
      path: 'customer-report/subscription-cancellation',
      element: <AdminPrivateRoutes component={SubscriptionCancellation} />
    },
    {
      path: 'customer-report/block-customer-list',
      element: <AdminPrivateRoutes component={BlockCustomerList} />
    },
    {
      path: 'customer-report/junk-user-list',
      element: <AdminPrivateRoutes component={JunkUserList} />
    },
    {
      path: 'customer-report/payment-refund',
      element: <AdminPrivateRoutes component={PaymentRefund} />
    },
    {
      path: 'customer-report/payment-refundlist',
      element: <AdminPrivateRoutes component={PaymentRefundListing} />
    },
    {
      path: 'customer-report/charge-client',
      element: <AdminPrivateRoutes component={ChargeClient} />
    },
    {
      path: 'report/auto-checkout-list',
      element: <AdminPrivateRoutes component={AutoCheckoutList} />
    },
    {
      path: 'report/all-customers',
      element: <AdminPrivateRoutes component={AllCustomers} />
    },
    {
      path: 'report/customer-not-paid-list',
      element: <AdminPrivateRoutes component={CustomerNotPaidList} />
    },
    {
      path: 'report/customer-paid-list',
      element: <AdminPrivateRoutes component={CustomerPaidList} />
    },
    {
      path: 'report/previous-list',
      element: <AdminPrivateRoutes component={PreviousList} />
    }
  ]
};

export default AdminRoutes;
