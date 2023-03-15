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
import { wGetStyleCustom, wEditStyleCustom } from 'actions/profile';

const Style_Custom = GenS3Link(
  'landing/images/client/profile/men/style-custom/brands'
);
const penguin = GenS3Link('landing/images/client/brands/penguin');
const nike = GenS3Link('landing/images/client/brands/nike');
const scotch = GenS3Link('landing/images/client/brands/scotch');
const gap = GenS3Link('landing/images/client/brands/gap');
const pata = GenS3Link('landing/images/client/brands/pata');
const tommy = GenS3Link('landing/images/client/brands/tommy');
const boss = GenS3Link('landing/images/client/brands/boss');
const vineyard = GenS3Link('landing/images/client/brands/vineyard');
const vans = GenS3Link('landing/images/client/brands/vans');
const hurley = GenS3Link('landing/images/client/brands/hurley');
const brooks = GenS3Link('landing/images/client/brands/brooks');
const zara = GenS3Link('landing/images/client/brands/zara');
const levis = GenS3Link('landing/images/client/brands/levis');
const armour = GenS3Link('landing/images/client/brands/armour');
const bonobos = GenS3Link('landing/images/client/brands/bonobos');
const landsend = GenS3Link('landing/images/client/brands/landsend');
const jcrew = GenS3Link('landing/images/client/brands/jcrew');
const oldnavy = GenS3Link('landing/images/client/brands/oldnavy');
const uniqlo = GenS3Link('landing/images/client/brands/uniqlo');
const northface = GenS3Link('landing/images/client/brands/northface');
const hm = GenS3Link('landing/images/client/brands/hm');
const eagle = GenS3Link('landing/images/client/brands/eagle');
const ragbone = GenS3Link('landing/images/client/brands/ragbone');
const bensharma = GenS3Link('landing/images/client/brands/bensharma');
const express = GenS3Link('landing/images/client/brands/express');
const polo = GenS3Link('landing/images/client/brands/polo');
const dillard = GenS3Link('landing/images/client/brands/dillard');
const macys = GenS3Link('landing/images/client/brands/macys');
const nm = GenS3Link('landing/images/client/brands/nm');
const urban = GenS3Link('landing/images/client/brands/urban');
const nordstrom = GenS3Link('landing/images/client/brands/nordstrom');

const StyleCustom = () => {
  //-- hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let saveReturn = false;
  const { wStyleCustom } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    DFnewLogger('wGetStyleCustom_____________________________');
    dispatch(wGetStyleCustom());
  }, [dispatch]);
  //-- params
  const left = {
    title: `Hi ${FirstUpper(user?.firstName)}`,
    content:
      'We are working with hundreds of brands and will help you FIT you under your budget.',
    image: Style_Custom
  };
  const initVal = {
    favBrandStoreLabel: [],
    addlComments: '',
    dsgnImgUrl1st: '',
    dsgnImgUrl2nd: '',
    dsgnImgUrl3rd: ''
  };
  const iBrands = [
    penguin,
    nike,
    scotch,
    gap,
    pata,
    tommy,
    boss,
    vineyard,
    vans,
    hurley,
    brooks,
    zara,
    levis,
    armour,
    bonobos,
    landsend,
    jcrew,
    oldnavy,
    uniqlo,
    northface,
    hm,
    eagle,
    ragbone,
    bensharma,
    express,
    polo,
    dillard,
    macys,
    nm,
    urban,
    nordstrom
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
                style={{ color: '#232f3e' }}
              >
                Price Range
              </Link>
            </Grid>
            <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
              <Link
                to="/welcome/style-custom/women"
                style={{ color: '#ff6c00' }}
              >
                Custom Design & Brands
              </Link>
            </Grid>
          </Grid>
          <Formik
            initialValues={wStyleCustom === null ? initVal : wStyleCustom}
            enableReinitialize
            onSubmit={async (values) => {
              DFnewLogger('__________________', values);
              if (saveReturn) {
                dispatch(wEditStyleCustom(values));
                saveReturn = false;
              } else {
                dispatch(wEditStyleCustom(values, navigate));
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
                      Brand or store you prefer to shop
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
                        value={values.addlComments}
                        name="addlComments"
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

export default StyleCustom;
