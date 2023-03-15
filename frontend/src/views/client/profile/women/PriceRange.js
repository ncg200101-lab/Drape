import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, Grid, Button, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

//-- component
import GenS3Link from 'utils/GenS3Link';
import NavTabs from '../../component/profile/NavTabs';
import Left from '../../component/profile/Left';
import { FirstUpper } from 'utils/FirstUpper';
import PriceRadioGroup from 'views/client/component/profile/PriceRadioGroup';
import DFnewLogger from 'utils/DFnewLogger';
//-- action
import { wEditPriceRange, wGetPriceRange } from 'actions/profile';

const Price_Range = GenS3Link(
  'landing/images/client/profile/women/price-range/price-range'
);

const PriceRange = () => {
  //-- hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let saveReturn = false;
  const { wPriceRange } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    DFnewLogger('wGetPriceRange___________________________');
    dispatch(wGetPriceRange());
  }, [dispatch]);
  //-- params
  const left = {
    title: `Hi ${FirstUpper(user?.firstName)}`,
    content:
      'Please complete your price range you are looking for that will help us have a best FIT under your budget',
    image: Price_Range
  };
  const initVal = {
    budgetTops: '',
    budgetBottoms: '',
    budgetOuterwear: '',
    budgetJeans: '',
    budgetJewelry: '',
    budgetAccessories: '',
    budgetDress: ''
  };
  const wears = [
    {
      title: 'TOPS',
      value: 'budgetTops',
      prices: ['Under $50', '$50 - $75', '$75 - $100', '$100 - $125', '$125+']
    },
    {
      title: 'BOTTOMS',
      value: 'budgetBottoms',
      prices: ['Under $30', '$30 - $50', '$50 - $70', '$70 - $90', '$90+']
    },
    {
      title: 'OUTERWEAR',
      value: 'budgetOuterwear',
      prices: ['Under $50', '$50 - $75', '$75 - $100', '$100 - $125', '$125+']
    },
    {
      title: 'JEANS',
      value: 'budgetJeans',
      prices: ['Under $75', '$75 - $100', '$100 - $125', '$125 - $175', '$175+']
    },
    {
      title: 'JEWELRY',
      value: 'budgetJewelry',
      prices: ['Under $40', '$40 - $60', '$60 - $80', '$80 - $100', '$100+']
    },
    {
      title: 'ACCESSORIES',
      value: 'budgetAccessories',
      prices: ['Under $75', '$75 - $125', '$125 - $175', '$175 - $250', '$250+']
    },
    {
      title: 'DRESS',
      value: 'budgetDress',
      prices: ['Under $75', '$75 - $125', '$125 - $175', '$175 - $250', '$250+']
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
              <Link to="/welcome/basic-info/women" style={{ color: '#232f3e' }}>
                Basic Information
              </Link>
            </Grid>
            <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
              <Link to="/welcome/style-fit/women" style={{ color: '#232f3e' }}>
                Style Fit
              </Link>
            </Grid>
            <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
              <Link
                to="/welcome/price-range/women"
                style={{ color: '#ff6c00' }}
              >
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
              <Link
                to="/welcome/style-custom/women"
                style={{ color: '#232f3e' }}
              >
                Custom Design & Brands
              </Link>
            </Grid>
          </Grid>
          <Formik
            initialValues={wPriceRange == null ? initVal : wPriceRange}
            enableReinitialize
            onSubmit={async (values) => {
              DFnewLogger(values);
              if (saveReturn) {
                dispatch(wEditPriceRange(values));
                saveReturn = false;
              } else {
                dispatch(wEditPriceRange(values, navigate));
              }
            }}
          >
            {({
              errors,
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
