import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Divider,
  Grid,
  Button,
  Typography,
  FormControl,
  useTheme,
  TextareaAutosize
} from '@mui/material';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

//-- component
import GenS3Link from 'utils/GenS3Link';
import DFnewLogger from 'utils/DFnewLogger';
import { FirstUpper } from 'utils/FirstUpper';
import NavTabs from '../../component/profile/NavTabs';
import Left from '../../component/profile/Left';
import ImageUpload from '../../component/profile/ImageUpload';
import BrandSelector from 'views/client/component/profile/BrandSelector';
//-- action
import { kgEditStyleCustom, kgGetStyleCustom } from 'actions/kids';

const Brand_Image = GenS3Link(
  'landing/images/client/profile/kids/style-custom/style-custom'
);
const janiejack = GenS3Link('landing/images/client/brands/janiejack');
const oldnavy = GenS3Link('landing/images/client/brands/oldnavy_2');
const tea = GenS3Link('landing/images/client/brands/tea');
const target = GenS3Link('landing/images/client/brands/target');
const jcrew = GenS3Link('landing/images/client/brands/jcrew');
const nike = GenS3Link('landing/images/client/brands/nike');
const childrenplace = GenS3Link('landing/images/client/brands/childrenplace');
const carters = GenS3Link('landing/images/client/brands/carters');
const zara = GenS3Link('landing/images/client/brands/zara');
const gymboree = GenS3Link('landing/images/client/brands/gymboree');
const armour = GenS3Link('landing/images/client/brands/armour');
const gap = GenS3Link('landing/images/client/brands/gap');
const kohls = GenS3Link('landing/images/client/brands/kohls');
const marshalls = GenS3Link('landing/images/client/brands/marshalls');
const justice = GenS3Link('landing/images/client/brands/justice');
const jcpenney = GenS3Link('landing/images/client/brands/jcpenney');
const amazon = GenS3Link('landing/images/client/brands/amazon');
const nordstrom = GenS3Link('landing/images/client/brands/nordstrom');
const walmart = GenS3Link('landing/images/client/brands/walmart');
const macys = GenS3Link('landing/images/client/brands/macys');

const GirlStyleCustom = () => {
  //-- get item from localstorage
  const order = localStorage.getItem('order');
  //-- hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let saveReturn = false;
  const { kgStyleCustom } = useSelector((state) => state.kids);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    DFnewLogger('kgGetPriceRange______________________________');
    dispatch(kgGetStyleCustom(order));
  }, [dispatch, order]);
  //-- params
  const left = {
    title: `Hi ${FirstUpper(user?.firstName)}`,
    content:
      'We are working with hundreds of brands and will help you FIT you under your budget.',
    image: Brand_Image
  };
  const initVal = {
    favBrandStoreLabel: [],
    addlComments: '',
    dsgnImgUrl1st: '',
    dsgnImgUrl2nd: '',
    dsgnImgUrl3rd: ''
  };
  const iBrands = [
    janiejack,
    oldnavy,
    tea,
    target,
    jcrew,
    nike,
    childrenplace,
    carters,
    zara,
    gymboree,
    armour,
    gap,
    kohls,
    marshalls,
    justice,
    jcpenney,
    amazon,
    nordstrom,
    walmart,
    macys
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
                style={{ color: '#232f3e' }}
              >
                Price Range
              </Link>
            </Grid>
            <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
              <Link
                to="/welcome/style-custom/kids/girl"
                style={{ color: '#ff6c00' }}
              >
                Custom Design & Brands
              </Link>
            </Grid>
          </Grid>
          <Formik
            initialValues={kgStyleCustom == null ? initVal : kgStyleCustom}
            enableReinitialize
            onSubmit={async (values) => {
              DFnewLogger(values);
              if (saveReturn) {
                dispatch(kgEditStyleCustom(values, order));
                saveReturn = false;
              } else {
                dispatch(kgEditStyleCustom(values, order, navigate));
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              touched,
              values
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container padding="20px">
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Please do click to upload any reference images / design
                      you want your stylist to work for you
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6} md={4}>
                        <ImageUpload
                          arg="dsgnImgUrl1st"
                          value={values.dsgnImgUrl1st}
                          setFieldValue={setFieldValue}
                        />
                        <Typography
                          className="basic-info-sub-title"
                          align="center"
                        >
                          First Design
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <ImageUpload
                          arg="dsgnImgUrl2nd"
                          value={values.dsgnImgUrl2nd}
                          setFieldValue={setFieldValue}
                        />
                        <Typography
                          className="basic-info-sub-title"
                          align="center"
                        >
                          Second Design
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <ImageUpload
                          arg="dsgnImgUrl3rd"
                          value={values.dsgnImgUrl3rd}
                          setFieldValue={setFieldValue}
                        />
                        <Typography
                          className="basic-info-sub-title"
                          align="center"
                        >
                          Third Design
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Brand or store you prefer to shop for your child
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <BrandSelector
                      brands={iBrands}
                      name="favBrandStoreLabel"
                      value={values.favBrandStoreLabel}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Add additional comments
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      sx={{ ...theme.typography.customInput }}
                    >
                      <TextareaAutosize
                        placeholder="add additional comments ..."
                        style={{
                          minWidth: '100%',
                          maxWidth: '100%',
                          minHeight: '100px',
                          padding: '15px',
                          borderColor: '#ccc',
                          borderRadius: '12px',
                          fontSize: '14px'
                        }}
                        value={values.comments}
                        name="comments"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </FormControl>
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
                      NEXT: MANAGE YOUR FIT SETTINGS&nbsp;&nbsp;&nbsp;
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

export default GirlStyleCustom;
