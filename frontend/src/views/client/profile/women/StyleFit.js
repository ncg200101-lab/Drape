import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, Grid, Typography, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

//-- component
import GenS3Link from 'utils/GenS3Link';
import Left from 'views/client/component/profile/Left';
import NavTabs from 'views/client/component/profile/NavTabs';
import DFnewLogger from 'utils/DFnewLogger';
import { FirstUpper } from 'utils/FirstUpper';
import ColorRect from 'views/client/component/profile/ColorRect';
import CustomCheckbox from 'views/client/component/profile/CustomCheckbox';
import CustomCheckboxBtn from 'views/client/component/profile/CustomCheckboxBtn';
import CustomRadioGroup from 'views/client/component/profile/CustomRadioGroup';
import RadioButtonImage from 'views/client/component/profile/RadioButtonImage';
import ImageSelectorCheckboxWide from 'views/client/component/profile/ImageSelectorCheckboxWide';
import ImageSelectorWithRadioGroup from 'views/client/component/profile/ImageSelectorWithRadioGroup';
import ImageSelectorCheckbox from 'views/client/component/profile/ImageSelectorCheckbox';

const Style_Fit = GenS3Link(
  'landing/images/client/profile/women/style-fit/style-fit'
);
const Inspiration_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/inspiration-1'
);
const Inspiration_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/inspiration-2'
);
const Inspiration_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/inspiration-3'
);
const Inspiration_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/inspiration-4'
);
const Inspiration_5 = GenS3Link(
  'landing/images/client/profile/women/style-fit/inspiration-5'
);
const DressLength_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/dress-length-1'
);
const DressLength_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/dress-length-2'
);
const DressLength_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/dress-length-3'
);
const DressLength_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/dress-length-4'
);
const TopHalf_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/top-half-1'
);
const TopHalf_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/top-half-2'
);
const TopHalf_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/top-half-3'
);
const PantLength_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-length-1'
);
const PantLength_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-length-2'
);
const PantLength_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-length-3'
);
const PantRise_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-rise-1'
);
const PantRise_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-rise-2'
);
const PantRise_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-rise-3'
);
const PantStyle_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-style-1'
);
const PantStyle_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-style-2'
);
const PantStyle_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-style-3'
);
const PantStyle_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-style-4'
);
const PantStyle_5 = GenS3Link(
  'landing/images/client/profile/women/style-fit/pant-style-5'
);
const AppareType_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/appare-type-1'
);
const AppareType_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/appare-type-2'
);
const AppareType_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/appare-type-3'
);
const AppareType_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/appare-type-4'
);
const AppareType_5 = GenS3Link(
  'landing/images/client/profile/women/style-fit/appare-type-5'
);
const AppareType_6 = GenS3Link(
  'landing/images/client/profile/women/style-fit/appare-type-6'
);
const AppareType_7 = GenS3Link(
  'landing/images/client/profile/women/style-fit/appare-type-7'
);
const BottomType_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/bottom-type-1'
);
const BottomType_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/bottom-type-2'
);
const BottomType_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/bottom-type-3'
);
const BottomType_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/bottom-type-4'
);
const BottomType_5 = GenS3Link(
  'landing/images/client/profile/women/style-fit/bottom-type-5'
);
const BottomType_6 = GenS3Link(
  'landing/images/client/profile/women/style-fit/bottom-type-6'
);
const BottomType_7 = GenS3Link(
  'landing/images/client/profile/women/style-fit/bottom-type-7'
);
const TopType_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/top-type-1'
);
const TopType_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/top-type-2'
);
const TopType_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/top-type-3'
);
const AvoidPattern_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/avoid-1'
);
const AvoidPattern_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/avoid-2'
);
const AvoidPattern_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/avoid-3'
);
const AvoidPattern_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/avoid-4'
);
const AvoidPattern_5 = GenS3Link(
  'landing/images/client/profile/women/style-fit/avoid-5'
);
const AvoidPattern_6 = GenS3Link(
  'landing/images/client/profile/women/style-fit/avoid-6'
);
const DenimStyle_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/denim-1'
);
const DenimStyle_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/denim-2'
);
const DenimStyle_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/denim-3'
);
const DenimStyle_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/denim-4'
);
const OutFit_0 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-1'
);
const OutFit_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-2'
);
const OutFit_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-3'
);
const OutFit_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-4'
);
const OutFit_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-5'
);
const OutFit_5 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-6'
);
const OutFit_6 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-7'
);
const OutFit_7 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-8'
);
//-- action
import { wEditStyleFit, wGetStyleFit } from 'actions/profile';

const StyleFit = () => {
  //-- hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let saveReturn = false;
  const { wStyleFit } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    DFnewLogger('wGetStyleFit______________________');
    dispatch(wGetStyleFit());
  }, [dispatch]);
  //-- params
  const left = {
    title: `Hi ${FirstUpper(user?.firstName)}`,
    content:
      'Please complete your style information that will help us to get completed a best FIT',
    image: Style_Fit
  };
  const initVal = {
    styleInspiration: [],
    dressLength: [],
    topHalf: [],
    pantLength: [],
    pantRise: [],
    pantStyle: [],
    appareType: [],
    bottomType: [],
    topType: [],
    avoidPattern: [],
    colors: [],
    mostlyNeutralsColor: [],
    mostlyColorfulColor: [],
    mostlyLightsColor: [],
    missingFit: [],
    dressupOccasion: '',
    missingCloset: [],
    denimStyle1: 1,
    denimStyle2: 1,
    denimStyle3: 1,
    denimStyle4: 1,
    outFit: [],
    outFitRadio0: '',
    outFitRadio1: '',
    outFitRadio2: '',
    outFitRadio3: '',
    outFitRadio4: '',
    outFitRadio5: '',
    outFitRadio6: '',
    outFitRadio7: ''
  };
  const iStyleInspiration = {
    title: '',
    gallery: [
      {
        title: 'Bohemian',
        image: Inspiration_1
      },
      {
        title: 'Casual',
        image: Inspiration_2
      },
      {
        title: 'Classic',
        image: Inspiration_3
      },
      {
        title: 'Edgy',
        image: Inspiration_4
      },
      {
        title: 'Trendy',
        image: Inspiration_5
      }
    ]
  };
  const iDressLength = {
    title: 'How do you like your clothing to fit?',
    subtitle: 'Dress length',
    gallery: [
      {
        title: 'Mini',
        image: DressLength_1
      },
      {
        title: 'Short',
        image: DressLength_2
      },
      {
        title: 'Midi',
        image: DressLength_3
      },
      {
        title: 'Maxi',
        image: DressLength_4
      }
    ]
  };
  const iTopHalf = {
    subtitle: 'Top half',
    gallery: [
      {
        title: 'Fitted',
        image: TopHalf_1
      },
      {
        title: 'Straight',
        image: TopHalf_2
      },
      {
        title: 'Loose',
        image: TopHalf_3
      }
    ]
  };
  const iPantLength = {
    subtitle: 'Pant Length',
    gallery: [
      {
        title: 'Ankle',
        image: PantLength_1
      },
      {
        title: 'Regular',
        image: PantLength_2
      },
      {
        title: 'Long',
        image: PantLength_3
      }
    ]
  };
  const iPantRise = {
    subtitle: 'Pant Rise',
    gallery: [
      {
        title: 'Low Rise',
        image: PantRise_1
      },
      {
        title: 'Mid Rise',
        image: PantRise_2
      },
      {
        title: 'High Rise',
        image: PantRise_3
      }
    ]
  };
  const iPantStyle = {
    subtitle: 'Pant Style',
    gallery: [
      {
        title: 'Skinny',
        image: PantStyle_1
      },
      {
        title: 'Straight',
        image: PantStyle_2
      },
      {
        title: 'Bootcut',
        image: PantStyle_3
      },
      {
        title: 'Relaxed',
        image: PantStyle_4
      },
      {
        title: 'Wide Leg',
        image: PantStyle_5
      }
    ]
  };
  const iAppareType = {
    title: 'Which types of appare would you like to receive?',
    gallery: [
      {
        title: 'Dresses / Jumpsuits',
        image: AppareType_1
      },
      {
        title: 'Tops',
        image: AppareType_2
      },
      {
        title: 'Bottoms',
        image: AppareType_3
      },
      {
        title: 'Denim',
        image: AppareType_4
      },
      {
        title: 'Sweaters',
        image: AppareType_5
      },
      {
        title: 'Jackets',
        image: AppareType_6
      },
      {
        title: 'Accessories',
        image: AppareType_7
      }
    ]
  };
  const iBottomType = {
    title: 'Which types of bottoms would you like to receive?',
    gallery: [
      {
        title: 'Skirts',
        image: BottomType_1
      },
      {
        title: 'Striped Shorts',
        image: BottomType_2
      },
      {
        title: 'Capri Jeans',
        image: BottomType_3
      },
      {
        title: 'Cargo Pant',
        image: BottomType_4
      },
      {
        title: 'Checked Pant',
        image: BottomType_5
      },
      {
        title: 'Palazzo',
        image: BottomType_6
      },
      {
        title: 'Denim Shorts',
        image: BottomType_7
      }
    ]
  };
  const iTopType = {
    title: 'Which types of tops would you like to receive?',
    gallery: [
      {
        title: 'Sleevelss',
        image: TopType_1
      },
      {
        title: 'Shorts Sleeve',
        image: TopType_2
      },
      {
        title: 'Long Sleeve',
        image: TopType_3
      }
    ]
  };
  const iAvoidPattern = {
    title: 'What patterns should you avoid?',
    mandatory: true,
    gallery: [
      {
        title: 'Lace',
        image: AvoidPattern_1
      },
      {
        title: 'Animal Print',
        image: AvoidPattern_2
      },
      {
        title: 'Tribal',
        image: AvoidPattern_3
      },
      {
        title: 'Polka Dot',
        image: AvoidPattern_4
      },
      {
        title: 'Stripes',
        image: AvoidPattern_5
      },
      {
        title: 'Floral',
        image: AvoidPattern_6
      }
    ]
  };
  const iMostlyNeutralsColor = {
    title: 'Which colors do you tend to mostly wear?',
    subtitle: 'NEUTRALS',
    items: ['Black', 'Grey', 'Navy', 'Beige', 'White']
  };
  const iMostlyColorfulColor = {
    subtitle: 'COLOR',
    items: ['Red', 'Blue', 'Yellow', 'Purple']
  };
  const iMostlyLightsColor = {
    subtitle: 'LIGHTS',
    items: ['White', 'Sand', 'Pastels']
  };
  const iMissingFit = [
    'Sweaters',
    'Blouses',
    'Jeans',
    'Pants',
    'Skirts',
    'Dresses'
  ];
  const iDressupOccasion = [
    'Business Casual / Work',
    'Cocktail / Wedding / Special',
    'Most of the time',
    'Around once or twice a week',
    'Around once or twice a month',
    'Date Night / Night Out',
    'Laid Back Casual',
    'Rarely'
  ];
  const iMissingCloset = {
    title: 'What do you feel is missing from your closet?',
    items: ['Sweaters', 'Blouses', 'Jeans', 'Pants', 'Skirts', 'Dresses']
  };
  const iDenimStyle1 = {
    content: ['Yes', 'Maybe', 'Never'],
    image: DenimStyle_1
  };
  const iDenimStyle2 = {
    content: ['Yes', 'Maybe', 'Never'],
    image: DenimStyle_2
  };
  const iDenimStyle3 = {
    content: ['Yes', 'Maybe', 'Never'],
    image: DenimStyle_3
  };
  const iDenimStyle4 = {
    content: ['Yes', 'Maybe', 'Never'],
    image: DenimStyle_4
  };
  const iOutFit = [
    OutFit_0,
    OutFit_1,
    OutFit_2,
    OutFit_3,
    OutFit_4,
    OutFit_5,
    OutFit_6,
    OutFit_7
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
              <Link to="/welcome/style-fit/women" style={{ color: '#ff6c00' }}>
                Style Fit
              </Link>
            </Grid>
            <Grid
              className={`gray-border breadcrumb-tab ${
                user?.pStatus < 2 ? 'disabled' : ''
              }`}
              item
              xs={12}
              sm={3}
            >
              <Link
                to="/welcome/price-range/women"
                style={{ color: '#232f3e' }}
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
          <Grid container>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Formik
                initialValues={wStyleFit == null ? initVal : wStyleFit}
                enableReinitialize
                validationSchema={Yup.object().shape({
                  styleInspiration: Yup.array().min(
                    1,
                    'Please select Style Inspiration'
                  ),
                  avoidPattern: Yup.array().min(
                    1,
                    'Please select Avoid Pattern'
                  ),
                  outFit: Yup.array().min(1, 'Please select OutFit')
                })}
                onSubmit={async (values) => {
                  DFnewLogger('Women Style Fit/submit:', values);
                  if (saveReturn) {
                    dispatch(wEditStyleFit(values));
                    saveReturn = false;
                  } else {
                    dispatch(wEditStyleFit(values, navigate));
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
                    <Grid container columnSpacing={4} padding="20px">
                      <Grid item xs={12}>
                        <Typography className="basic-info-title" align="center">
                          Style Inspiration{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <Typography
                          className="basic-info-sup-content"
                          align="center"
                        >
                          Are you looking to incorporate more of the styles
                          below into your wardrobe? Select the styles below that
                          you inspire to look like or would like to explore.
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iStyleInspiration}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="styleInspiration"
                          value={values.styleInspiration}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iDressLength}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="dressLength"
                          value={values.dressLength}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iTopHalf}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="topHalf"
                          value={values.topHalf}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iPantLength}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="pantLength"
                          value={values.pantLength}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iPantRise}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="pantRise"
                          value={values.pantRise}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iPantStyle}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="pantStyle"
                          value={values.pantStyle}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckboxWide
                          content={iAppareType}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="appareType"
                          value={values.appareType}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iBottomType}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="bottomType"
                          value={values.bottomType}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iTopType}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="topType"
                          value={values.topType}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          Please tell us the OutFit you prefer to wear.{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorWithRadioGroup
                          content={iOutFit}
                          errors={errors}
                          touched={touched}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          setFieldValue={setFieldValue}
                          name="outFit"
                          rname="outFitRadio"
                          value={values}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iAvoidPattern}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="avoidPattern"
                          value={values.avoidPattern}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <ColorRect
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="colors"
                          value={values.colors}
                          subject="you"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckbox
                          content={iMostlyNeutralsColor}
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          name="mostlyNeutralsColor"
                          value={values.mostlyNeutralsColor}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckbox
                          content={iMostlyColorfulColor}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="mostlyColorfulColor"
                          value={values.mostlyColorfulColor}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckbox
                          content={iMostlyLightsColor}
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          name="mostlyLightsColor"
                          value={values.mostlyLightsColor}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          What do you feel is missing from your FIT?
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxBtn
                          part={iMissingFit}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="missingFit"
                          value={values.missingFit}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          Would you wear any of these denim styles?
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} lg={4}>
                            <RadioButtonImage
                              group={iDenimStyle1}
                              name="denimStyle1"
                              value={values.denimStyle1}
                              touched={touched}
                              errors={errors}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} lg={4}>
                            <RadioButtonImage
                              group={iDenimStyle2}
                              name="denimStyle2"
                              value={values.denimStyle2}
                              touched={touched}
                              errors={errors}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} lg={4}>
                            <RadioButtonImage
                              group={iDenimStyle3}
                              name="denimStyle3"
                              value={values.denimStyle3}
                              touched={touched}
                              errors={errors}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} lg={4}>
                            <RadioButtonImage
                              group={iDenimStyle4}
                              name="denimStyle4"
                              value={values.denimStyle4}
                              touched={touched}
                              errors={errors}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          How often do you dress up for the following occasions?
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <CustomRadioGroup
                          name="dressupOccasion"
                          value={values.dressupOccasion}
                          handleChange={handleChange}
                          touched={touched}
                          errors={errors}
                          content={iDressupOccasion}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckbox
                          content={iMissingCloset}
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          name="missingCloset"
                          value={values.missingCloset}
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
                          NEXT: PRICE RANGE&nbsp;&nbsp;&nbsp;
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
        </Grid>
      </Grid>
    </>
  );
};

export default StyleFit;
