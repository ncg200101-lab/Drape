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
import Left from '../../component/profile/Left';
import PriceRadioGroup from 'views/client/component/profile/PriceRadioGroup';
import DFnewLogger from 'utils/DFnewLogger';
//-- action
import { kgEditPriceRange, kgGetPriceRange } from 'actions/kids';

const Price_Range = GenS3Link(
  'landing/images/client/profile/kids/price-range/girl/price-range'
);

const GirlPriceRange = () => {
  //-- get item from localstorage
  const order = localStorage.getItem('order');
  //-- hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let saveReturn = false;
  const { kgPriceRange } = useSelector((state) => state.kids);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    DFnewLogger('kgGetPriceRange______________________________');
    dispatch(kgGetPriceRange(order));
  }, [dispatch, order]);
  //-- params
  const left = {
    title: `Hi ${FirstUpper(user?.firstName)}`,
    content:
      'Please complete your child price range you are looking for that will help us have a best FIT under your budget',
    image: Price_Range
  };
  const initVal = {
    casualShirts: '',
    skirtsShorts: '',
    leggings: '',
    jeans: '',
    dresses: '',
    sweaters: '',
    blouses: '',
    jackets: '',
    shoes: ''
  };
  const wears = [
    {
      title: 'CASUAL SHIRTS',
      value: 'casualShirts',
      prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+']
    },
    {
      title: 'SKIRTS & SHORTS',
      value: 'skirtsShorts',
      prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+']
    },
    {
      title: 'LEGGINGS',
      value: 'leggings',
      prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+']
    },
    {
      title: 'JEANS',
      value: 'jeans',
      prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+']
    },
    {
      title: 'DRESSES',
      value: 'dresses',
      prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+']
    },
    {
      title: 'SWEATERS',
      value: 'sweaters',
      prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+']
    },
    {
      title: 'BLOUSES',
      value: 'blouses',
      prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+']
    },
    {
      title: 'JACKETS',
      value: 'jackets',
      prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+']
    },
    {
      title: 'SHOES',
      value: 'shoes',
      prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+']
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
              <Link to="/welcome/basic-info/kids" style={{ color: '#232f3e' }}>
                Basic Information
              </Link>
            </Grid>
            <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
              <Link
                to="/welcome/style-fit/kids/girl"
                style={{ color: '#232f3e' }}
              >
                Style Fit
              </Link>
            </Grid>
            <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
              <Link
                to="/welcome/price-range/kids/girl"
                style={{ color: '#ff6c00' }}
              >
                Price Range
              </Link>
            </Grid>
            <Grid
              className={`gray-border breadcrumb-tab ${
                user?.kids[order - 1]?.kStatus < 3 ? 'disabled' : ''
              }`}
              item
              xs={12}
              sm={3}
            >
              <Link
                to="/welcome/style-custom/kids/girl"
                style={{ color: '#232f3e' }}
              >
                Custom Design & Brands
              </Link>
            </Grid>
          </Grid>
          <Formik
            initialValues={kgPriceRange == null ? initVal : kgPriceRange}
            enableReinitialize
            onSubmit={async (values) => {
              DFnewLogger(values);
              if (saveReturn) {
                dispatch(kgEditPriceRange(values, order));
                saveReturn = false;
              } else {
                dispatch(kgEditPriceRange(values, order, navigate));
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

export default GirlPriceRange;
