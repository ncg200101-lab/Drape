import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, Grid, Button, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

//-- component
import GenS3Link from 'utils/GenS3Link';
import { FirstUpper } from 'utils/FirstUpper';
import NavTabs from '../../component/profile/NavTabs';
import PriceRadioGroup from 'views/client/component/profile/PriceRadioGroup';
import PriceSelectGroup from 'views/client/component/profile/PriceSelectGroup';
import DFnewLogger from 'utils/DFnewLogger';
import Left from '../../component/profile/Left';
//-- action
import { mEditPriceRange, mGetPriceRange } from 'actions/profile';

const Price_Range = GenS3Link(
  'landing/images/client/profile/men/price-range/price-range'
);

const PriceRange = () => {
  //-- hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let saveReturn = false;
  const { mPriceRange } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    DFnewLogger('mGetPriceRange____________________________');
    dispatch(mGetPriceRange());
  }, [dispatch]);
  //-- params
  const left = {
    title: `Hi ${FirstUpper(user?.firstName)}`,
    content:
      'Please complete your price range you are looking for that will help us have a best FIT under your budget',
    image: Price_Range
  };
  const initVal = {
    budgetShirts: '',
    budgetTeesPolos: '',
    budgetSweatersShirts: '',
    budgetPantsDenim: '',
    budgetShorts: '',
    budgetShoes: '',
    budgetOuterwear: '',
    accTiesLabel: 0,
    accBeltsLabel: 0,
    accWalletsBagsLabel: 0,
    accSunglassesLabel: 0,
    accHatsLabel: 0,
    ugSocksLabel: 0,
    ugUnderwearLabel: 0,
    ugGroomingLabel: 0
  };
  const wears = [
    {
      title: 'SHIRTS',
      value: 'budgetShirts',
      prices: ['Under $50', '$50 - $75', '$75 - $100', '$100 - $125', '$125+']
    },
    {
      title: 'TEES & POLOS',
      value: 'budgetTeesPolos',
      prices: ['Under $30', '$30 - $50', '$50 - $70', '$70 - $90', '$90+']
    },
    {
      title: 'SWEATERS & SWEATSHIRTS',
      value: 'budgetSweatersShirts',
      prices: ['Under $50', '$50 - $75', '$75 - $100', '$100 - $125', '$125+']
    },
    {
      title: 'PANTS & DENIM',
      value: 'budgetPantsDenim',
      prices: ['Under $75', '$75 - $100', '$100 - $125', '$125 - $175', '$175+']
    },
    {
      title: 'SHORTS',
      value: 'budgetShorts',
      prices: ['Under $40', '$40 - $60', '$60 - $80', '$80 - $100', '$100+']
    },
    {
      title: 'SHOES',
      value: 'budgetShoes',
      prices: ['Under $75', '$75 - $125', '$125 - $175', '$175 - $250', '$250+']
    },
    {
      title: 'OUTERWEAR',
      value: 'budgetOuterwear',
      prices: ['Under $75', '$75 - $125', '$125 - $175', '$175 - $250', '$250+']
    }
  ];
  const accessories = [
    {
      title: 'TIES',
      value: 'accTiesLabel',
      prices: ['I want the best', '$40 - $60', 'Up to $80', 'Up to $100']
    },
    {
      title: 'BELTS',
      value: 'accBeltsLabel',
      prices: ['I want the best', '$30 - $50', 'Up to $70', 'Up to $90']
    },
    {
      title: 'WALLETS, BAGS',
      value: 'accWalletsBagsLabel',
      prices: ['I want the best', '$25 - $50', 'Up to $75', 'Up to $100']
    },
    {
      title: 'SUNGLASSES',
      value: 'accSunglassesLabel',
      prices: [
        'I want the best',
        '$40 - $60',
        'Up to $80',
        'Up to $100',
        '$100 - $150'
      ]
    },
    {
      title: 'HATS',
      value: 'accHatsLabel',
      prices: ['I want the best', '$30 - $50', 'Up to $70']
    }
  ];
  const underwear = [
    {
      title: 'SOCKS',
      value: 'ugSocksLabel',
      prices: ['I want the best', '$10 - $25', 'Up to $35', 'Up to $45']
    },
    {
      title: 'UNDERWEAR',
      value: 'ugUnderwearLabel',
      prices: ['I want the best', '$10 - $25', 'Up to $35', 'Up to $45']
    },
    {
      title: 'GROOMING',
      value: 'ugGroomingLabel',
      prices: ['I want the best', '$10 - $25', 'Up to $35', 'Up to $45']
    }
  ];

  return (
    <>
      <NavTabs />
      <Divider />
      <Grid className="profile" container>
        <Grid item xs={12} md={3}>
          <Left propsValue={left} />
        </Grid>
        <Divider
          orientation="horizontal"
          style={{ backgroundColor: '#eee', width: '1px' }}
        />
        <Grid item xs={12} md={8}>
          <Grid container>
            <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
              <Link to="/welcome/basic-info/men" style={{ color: '#232f3e' }}>
                Basic Information
              </Link>
            </Grid>
            <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
              <Link to="/welcome/style-fit/men" style={{ color: '#232f3e' }}>
                Style Fit
              </Link>
            </Grid>
            <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
              <Link to="/welcome/price-range/men" style={{ color: '#ff6c00' }}>
                Price Range
              </Link>
            </Grid>
            <Grid
              className={`gray-border breadcrumb-tab ${
                user?.pStatus < 3 ? 'disabled' : ''
              }`}
              item
              xs={12}
              sm={3}
            >
              <Link to="/welcome/style-custom/men" style={{ color: '#232f3e' }}>
                Custom Design & Brands
              </Link>
            </Grid>
          </Grid>
          <Formik
            initialValues={mPriceRange == null ? initVal : mPriceRange}
            enableReinitialize
            onSubmit={async (values) => {
              DFnewLogger(values);
              if (saveReturn) {
                dispatch(mEditPriceRange(values));
                saveReturn = false;
              } else {
                dispatch(mEditPriceRange(values, navigate));
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container padding="20px">
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Help Us Know your Budget
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <PriceRadioGroup
                      wears={wears}
                      value={values}
                      touched={touched}
                      errors={errors}
                      handleChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Accessories
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <PriceSelectGroup
                      value={values}
                      initValue={accessories}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Underwear & Grooming
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <PriceSelectGroup
                      value={values}
                      initValue={underwear}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                  <Grid className="h-align-center" item xs={12}>
                    <Button
                      type="submit"
                      disableElevation
                      disabled={isSubmitting}
                      className="profile-gradient-btn"
                    >
                      NEXT: CUSTOM DESIGN & BRANDS&nbsp;&nbsp;&nbsp;
                      <FontAwesomeIcon icon={faLongArrowRight} />
                    </Button>
                  </Grid>
                  <Grid className="h-align-center" item xs={12}>
                    <Typography
                      className="save-return"
                      onClick={() => {
                        saveReturn = true;
                        handleSubmit();
                      }}
                    >
                      SAVE AND RETURN &rsaquo;&rsaquo;
                    </Typography>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default PriceRange;
