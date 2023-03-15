import { lazy } from 'react';

import Loadable from 'ui-component/Loadable';
import UserLayout from 'layout/UserLayout';
import ComponentLoader from 'utils/ComponentLoader';
import PrivateRoutes from 'utils/PrivateRoutes';
import AuthRoutes from 'utils/AuthRoutes';
//-- auth
const MyLogin = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/pages/authentication/auth-modes/MyLogin')
    )
  )
);
const MySignup = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/pages/authentication/auth-modes/MySignup')
    )
  )
);
const MyForgotPwd = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/pages/authentication/auth-modes/MyForgotPwd')
    )
  )
);
const MyResetPwd = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/pages/authentication/auth-modes/MyResetPwd')
    )
  )
);
const MyVerify = Loadable(
  lazy(() =>
    ComponentLoader(() =>
      import('views/pages/authentication/auth-modes/MyVerify')
    )
  )
);
//-- landing | categories
const Landing = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/landing')))
);
const Men = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/men/men')))
);
const BigTall = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/men/big-tall')))
);
const Women = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/women/women')))
);
const PlusSize = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/women/plus-size')))
);
const Maternity = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/women/maternity')))
);
const Petite = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/women/petite')))
);
const Jeans = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/women/women-jeans')))
);
const Business = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/women/women-business')))
);
const Kids = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/kids')))
);
//-- landing | about us
const WhoWeAre = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/about-us/WhoWeAre')))
);
const OurMission = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/about-us/OurMission')))
);
const OurStylist = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/about-us/OurStylist')))
);
const ExecutiveTeam = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/about-us/ExecutiveTeam'))
  )
);
const News = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/the-company/News')))
);
const Careers = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/the-company/Careers')))
);
const FAQ = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/customer-care/FAQ')))
);
const ReturnExchange = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/customer-care/ReturnExchange'))
  )
);
const TrackOrder = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/customer-care/TrackOrder'))
  )
);
const HelpCenter = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/customer-care/HelpCenter'))
  )
);
const ContactUs = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/customer-care/ContactUs'))
  )
);
const TermsConditions = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/site-agree/TermsConditions'))
  )
);
const PrivacyPolicy = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/site-agree/PrivacyPolicy'))
  )
);
const Sitemap = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/site-agree/Sitemap')))
);
const HowDrapeFitWorks = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/recommended/HowDrapeFitWorks'))
  )
);
const FitBoxPricing = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/recommended/FitBoxPricing'))
  )
);
const PersonalStylist = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/recommended/PersonalStylist'))
  )
);

//-- men | profile
const MenBasicInfo = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/men/BasicInfo'))
  )
);
const MenStyleFit = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/men/StyleFit')))
);
const MenPriceRange = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/men/PriceRange'))
  )
);
const MenStyleCustom = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/men/StyleCustom'))
  )
);
const Schedule = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/Schedule')))
);
const Reservation = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/Reservation')))
);
const AddressBook = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/AddressBook')))
);
const Payment = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/Payment')))
);
const AddCard = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/AddCard')))
);
const PaymentSuccess = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/PaymentSuccess'))
  )
);
const NotShipped = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/NotShipped')))
);
const Order = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/Order')))
);
const Referrals = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/Referrals')))
);
const OrderReview = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/OrderReview')))
);

//-- women | profile
const WomenBasicInfo = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/women/BasicInfo'))
  )
);
const WomenStyleFit = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/women/StyleFit'))
  )
);
const WomenPriceRange = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/women/PriceRange'))
  )
);
const WomenStyleCustom = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/women/StyleCustom'))
  )
);

//--  kids | profile
const KidsBasicInfo = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/kids/BasicInfo'))
  )
);
const KidsBoyStyleFit = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/kids/BoyStyleFit'))
  )
);
const KidsGirlStyleFit = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/kids/GirlStyleFit'))
  )
);
const KidsBoyPriceRange = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/kids/BoyPriceRange'))
  )
);
const KidsGirlPriceRange = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/kids/GirlPriceRange'))
  )
);
const KidsBoyStyleCustom = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/kids/BoyStyleCustom'))
  )
);
const KidsGirlStyleCustom = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/kids/GirlStyleCustom'))
  )
);
const Account = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/account/index')))
);
const SelectFIT = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/SelectFIT')))
);
const CalendarSchedule = Loadable(
  lazy(() =>
    ComponentLoader(() => import('views/client/profile/CalendarSchedule'))
  )
);

//-- error pages
const Page404 = Loadable(lazy(() => import('views/pages/error/Page404')));

const UserRoutes = {
  path: '/',
  element: <UserLayout />,
  children: [
    {
      index: true,
      element: <Landing />
    },
    //============================ Auth ============================//
    {
      path: '/login',
      element: <AuthRoutes component={MyLogin} />
    },
    {
      path: '/signup',
      element: <AuthRoutes component={MySignup} />
    },
    {
      path: '/forgot-pwd',
      element: <AuthRoutes component={MyForgotPwd} />
    },
    {
      path: '/reset-pwd',
      element: <AuthRoutes component={MyResetPwd} />
    },
    {
      path: '/verify',
      element: <AuthRoutes component={MyVerify} />
    },
    //============================ Men ============================//
    {
      path: '/men',
      element: <Men />
    },
    {
      path: '/men/big-tall',
      element: <BigTall />
    },
    //============================ Women ============================//
    {
      path: '/women',
      element: <Women />
    },
    {
      path: '/women/plus-size',
      element: <PlusSize />
    },
    {
      path: '/women/maternity',
      element: <Maternity />
    },
    {
      path: '/women/petite',
      element: <Petite />
    },
    {
      path: '/women/women-jeans',
      element: <Jeans />
    },
    {
      path: '/women/women-business',
      element: <Business />
    },
    //============================ Kids ============================//
    {
      path: '/kids',
      element: <Kids />
    },
    //============================ About Us ============================//
    {
      path: '/about-us/who-we-are',
      element: <WhoWeAre />
    },
    {
      path: '/about-us/our-mission',
      element: <OurMission />
    },
    {
      path: '/about-us/our-stylist',
      element: <OurStylist />
    },
    {
      path: '/about-us/executive-team',
      element: <ExecutiveTeam />
    },
    //============================ The Company ============================//
    {
      path: '/the-company/news',
      element: <News />
    },
    {
      path: '/the-company/careers',
      element: <Careers />
    },
    //============================ Customer Care ============================//
    {
      path: '/customer-care/faq',
      element: <FAQ />
    },
    {
      path: '/customer-care/track-order',
      element: <TrackOrder />
    },
    {
      path: '/customer-care/return-and-exchange',
      element: <ReturnExchange />
    },
    {
      path: '/customer-care/help-center',
      element: <HelpCenter />
    },
    {
      path: '/customer-care/contact-us',
      element: <ContactUs />
    },
    //============================ Footer Link ============================//
    {
      path: '/terms-and-conditions',
      element: <TermsConditions />
    },
    {
      path: '/privacy-policy',
      element: <PrivacyPolicy />
    },
    {
      path: '/sitemap',
      element: <Sitemap />
    },
    //============================ Recommended ============================//
    {
      path: '/recommended/how-drape-fit-works',
      element: <HowDrapeFitWorks />
    },
    {
      path: '/recommended/fit-box-pricing',
      element: <FitBoxPricing />
    },
    {
      path: '/recommended/personal-stylist',
      element: <PersonalStylist />
    },
    //============================ Private Route ============================//
    {
      path: '/welcome/basic-info/men',
      element: <PrivateRoutes component={MenBasicInfo} />
    },
    {
      path: '/welcome/basic-info/women',
      element: <PrivateRoutes component={WomenBasicInfo} />
    },
    {
      path: '/welcome/basic-info/kids',
      element: <PrivateRoutes component={KidsBasicInfo} />
    },
    {
      path: '/welcome/style-fit/men',
      element: <PrivateRoutes component={MenStyleFit} />
    },
    {
      path: '/welcome/style-fit/women',
      element: <PrivateRoutes component={WomenStyleFit} />
    },
    {
      path: '/welcome/style-fit/kids/girl',
      element: <PrivateRoutes component={KidsGirlStyleFit} />
    },
    {
      path: '/welcome/style-fit/kids/boy',
      element: <PrivateRoutes component={KidsBoyStyleFit} />
    },
    {
      path: '/welcome/price-range/men',
      element: <PrivateRoutes component={MenPriceRange} />
    },
    {
      path: '/welcome/price-range/women',
      element: <PrivateRoutes component={WomenPriceRange} />
    },
    {
      path: '/welcome/price-range/kids/girl',
      element: <PrivateRoutes component={KidsGirlPriceRange} />
    },
    {
      path: '/welcome/price-range/kids/boy',
      element: <PrivateRoutes component={KidsBoyPriceRange} />
    },
    {
      path: '/welcome/style-custom/men',
      element: <PrivateRoutes component={MenStyleCustom} />
    },
    {
      path: '/welcome/style-custom/women',
      element: <PrivateRoutes component={WomenStyleCustom} />
    },
    {
      path: '/welcome/style-custom/kids/girl',
      element: <PrivateRoutes component={KidsGirlStyleCustom} />
    },
    {
      path: '/welcome/style-custom/kids/boy',
      element: <PrivateRoutes component={KidsBoyStyleCustom} />
    },
    {
      path: '/welcome/schedule',
      element: <PrivateRoutes component={Schedule} />
    },
    {
      path: '/welcome/reservation',
      element: <PrivateRoutes component={Reservation} />
    },
    {
      path: '/welcome/addressbook',
      element: <PrivateRoutes component={AddressBook} />
    },
    {
      path: '/welcome/payment',
      element: <PrivateRoutes component={Payment} />
    },
    {
      path: '/add-card/payment',
      element: <PrivateRoutes component={AddCard} />
    },
    {
      path: '/payment-success',
      element: <PrivateRoutes component={PaymentSuccess} />
    },
    {
      path: '/not-yet-shipped',
      element: <PrivateRoutes component={NotShipped} />
    },
    {
      path: '/order',
      element: <PrivateRoutes component={Order} />
    },
    {
      path: '/order-review',
      element: <PrivateRoutes component={OrderReview} />
    },
    {
      path: '/clients/referrals',
      element: <PrivateRoutes component={Referrals} />
    },
    {
      path: '/account',
      element: <PrivateRoutes component={Account} />
    },
    {
      path: '/select-gender',
      element: <PrivateRoutes component={SelectFIT} />
    },
    {
      path: '/calendar-schedule',
      element: <PrivateRoutes component={CalendarSchedule} />
    },
    {
      path: '*',
      element: <Page404 />
    }
  ]
};

export default UserRoutes;
