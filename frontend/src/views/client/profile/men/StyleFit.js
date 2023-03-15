import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Grid, Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

//-- component
import GenS3Link from 'utils/GenS3Link';
import NavTabs from '../../component/profile/NavTabs';
import Left from '../../component/profile/Left';
import ImageSelectorCheckbox from 'views/client/component/profile/ImageSelectorCheckbox';
import DFnewLogger from 'utils/DFnewLogger';
import CustomCheckboxBtn from 'views/client/component/profile/CustomCheckboxBtn';
import ColorRect from 'views/client/component/profile/ColorRect';
import { FirstUpper } from 'utils/FirstUpper';
//-- action
import { mEditStyleFit, mGetStyleFit } from 'actions/profile';

const Style_Fit = GenS3Link(
  'landing/images/client/profile/men/style-fit/style-fit'
);
const TypicallyWork_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/typically-work-1'
);
const TypicallyWork_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/typically-work-2'
);
const TypicallyWork_3 = GenS3Link(
  'landing/images/client/profile/men/style-fit/typically-work-3'
);
const CasualShirt_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/casual-shirt-1'
);
const CasualShirt_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/casual-shirt-2'
);
const ButtonShirt_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/button-shirt-1'
);
const ButtonShirt_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/button-shirt-2'
);
const Jeans_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/jeans-1'
);
const Jeans_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/jeans-2'
);
const Jeans_3 = GenS3Link(
  'landing/images/client/profile/men/style-fit/jeans-3'
);
const Jeans_4 = GenS3Link(
  'landing/images/client/profile/men/style-fit/jeans-4'
);
const Bottom_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/bottom-1'
);
const Bottom_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/bottom-2'
);
const Shorts_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/shorts-1'
);
const Shorts_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/shorts-2'
);
const Shorts_3 = GenS3Link(
  'landing/images/client/profile/men/style-fit/shorts-3'
);
const Shorts_4 = GenS3Link(
  'landing/images/client/profile/men/style-fit/shorts-4'
);
const OutFit_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit1'
);
const OutFit_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit2'
);
const OutFit_3 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit3'
);
const OutFit_4 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit4'
);
const OutFit_5 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit5'
);
const OutFit_6 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit6'
);
const OutFit_7 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit7'
);
const OutFit_8 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit8'
);
const OutFit_9 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit9'
);
const OutFit_10 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit10'
);
const OutFit_11 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit11'
);
const OutFit_12 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit12'
);
const OutFit_13 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit13'
);
const OutFit_14 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit14'
);
const OutFit_15 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit15'
);
const OutFit_16 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit16'
);
const OutFit_17 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit17'
);
const OutFit_18 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit18'
);
const OutFit_19 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit19'
);
const OutFit_20 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit20'
);

const StyleFit = () => {
  //-- hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let saveReturn = false;
  const { mStyleFit } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    DFnewLogger('mGetStyleFit_________________________');
    dispatch(mGetStyleFit());
  }, [dispatch]);
  //-- params
  const left = {
    title: `Hi ${FirstUpper(user?.firstName)}`,
    content:
      'Please complete your style information that will help us to get completed a best FIT',
    image: Style_Fit
  };
  const initVal = {
    typicalWear2Work: [],
    casualShirts: [],
    btnUpShirts: [],
    jeans: [],
    bottoms: [],
    shorts: [],
    colors: [],
    outfits: [],
    fitIssues: []
  };
  const iTypicallyWear2Work = {
    title: 'What do you typically wear to work?',
    gallery: [
      {
        title: 'Casual',
        image: TypicallyWork_1
      },
      {
        title: 'Business Casual',
        image: TypicallyWork_2
      },
      {
        title: 'Formal',
        image: TypicallyWork_3
      }
    ]
  };
  const iCasualShirts = {
    title: 'Your casual shirts to fit?',
    mandatory: true,
    gallery: [
      {
        title: 'Slim',
        image: CasualShirt_1
      },
      {
        title: 'Regular',
        image: CasualShirt_2
      }
    ]
  };
  const iBtnUpShirts = {
    title: 'How do you like your button-up shirts to fit?',
    mandatory: true,
    gallery: [
      {
        title: 'Slim',
        image: ButtonShirt_1,
        content:
          'Fitted through the chest, trim through the waist, tapered sleeves'
      },
      {
        title: 'Regular',
        image: ButtonShirt_2,
        content: 'Relaxed through the chest, waist, armholes & sleeves'
      }
    ]
  };
  const iJeans = {
    title: 'How do you like your jeans to fit?',
    mandatory: true,
    gallery: [
      {
        title: 'Straight',
        image: Jeans_1
      },
      {
        title: 'Slim',
        image: Jeans_2
      },
      {
        title: 'Skinny',
        image: Jeans_3
      },
      {
        title: 'Relaxed',
        image: Jeans_4
      }
    ]
  };
  const iBottoms = {
    title: 'Bottoms',
    mandatory: true,
    gallery: [
      {
        title: 'Tighter Fitting',
        image: Bottom_1
      },
      {
        title: 'More Relaxed',
        image: Bottom_2
      }
    ]
  };
  const iShorts = {
    title: 'How long do you prefer your shorts?',
    mandatory: true,
    gallery: [
      {
        title: 'Upper Thigh',
        image: Shorts_1
      },
      {
        title: 'Lower Thigh',
        image: Shorts_2
      },
      {
        title: 'Above Thigh',
        image: Shorts_3
      },
      {
        title: 'At The Knee',
        image: Shorts_4
      }
    ]
  };
  const iOutfits = {
    title: 'Tell us which of these outfits would you prefer to wear?',
    mandatory: true,
    gallery: [
      {
        title: '',
        image: OutFit_1
      },
      {
        title: '',
        image: OutFit_2
      },
      {
        title: '',
        image: OutFit_3
      },
      {
        title: '',
        image: OutFit_4
      },
      {
        title: '',
        image: OutFit_5
      },
      {
        title: '',
        image: OutFit_6
      },
      {
        title: '',
        image: OutFit_7
      },
      {
        title: '',
        image: OutFit_8
      },
      {
        title: '',
        image: OutFit_9
      },
      {
        title: '',
        image: OutFit_10
      },
      {
        title: '',
        image: OutFit_11
      },
      {
        title: '',
        image: OutFit_12
      },
      {
        title: '',
        image: OutFit_13
      },
      {
        title: '',
        image: OutFit_14
      },
      {
        title: '',
        image: OutFit_15
      },
      {
        title: '',
        image: OutFit_16
      },
      {
        title: '',
        image: OutFit_17
      },
      {
        title: '',
        image: OutFit_18
      },
      {
        title: '',
        image: OutFit_19
      },
      {
        title: '',
        image: OutFit_20
      }
    ]
  };
  const iFitIssues = [
    'Long Arms',
    'Short Arms',
    'Thick Arms',
    'Broad Shoulders',
    'Man Boobs',
    'Big Belly',
    'Big Butt',
    'Small Butt',
    'Thunder Things',
    'Thick Neck',
    'Short Torso',
    'Long Torso',
    'Broad Chest',
    'Very Skinny',
    'Skinny Legs'
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
            <Grid item xs={12}>
              <Grid container>
                <Grid
                  className="gray-border breadcrumb-tab"
                  item
                  xs={12}
                  sm={3}
                >
                  <Link
                    to="/welcome/basic-info/men"
                    style={{ color: '#232f3e' }}
                  >
                    Basic Information
                  </Link>
                </Grid>
                <Grid
                  className="gray-border breadcrumb-tab"
                  item
                  xs={12}
                  sm={3}
                >
                  <Link
                    to="/welcome/style-fit/men"
                    style={{ color: '#ff6c00' }}
                  >
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
                    to="/welcome/price-range/men"
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
                    to="/welcome/style-custom/men"
                    style={{ color: '#232f3e' }}
                  >
                    Custom Design & Brands
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Formik
                initialValues={mStyleFit == null ? initVal : mStyleFit}
                enableReinitialize
                validationSchema={Yup.object().shape({
                  casualShirts: Yup.array().min(
                    1,
                    'Please select Casual Shirts'
                  ),
                  btnUpShirts: Yup.array().min(
                    1,
                    'Please select Button-up Shirts'
                  ),
                  jeans: Yup.array().min(1, 'Please select Jeans'),
                  bottoms: Yup.array().min(1, 'Please select Bottoms'),
                  shorts: Yup.array().min(1, 'Please select Shorts'),
                  outfits: Yup.array().min(1, 'Please select OutFits')
                })}
                onSubmit={async (values) => {
                  DFnewLogger('Women Style Fit/submit:', values);
                  if (saveReturn) {
                    dispatch(mEditStyleFit(values));
                    saveReturn = false;
                  } else {
                    dispatch(mEditStyleFit(values, navigate));
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
                    <Grid container columnSpacing={4} padding="20px">
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iTypicallyWear2Work}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="typicalWear2Work"
                          value={values.typicalWear2Work}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iCasualShirts}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="casualShirts"
                          value={values.casualShirts}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iBtnUpShirts}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="btnUpShirts"
                          value={values.btnUpShirts}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iJeans}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="jeans"
                          value={values.jeans}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iBottoms}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="bottoms"
                          value={values.bottoms}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iShorts}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="shorts"
                          value={values.shorts}
                        />
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
                        <ImageSelectorCheckbox
                          content={iOutfits}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="outfits"
                          value={values.outfits}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          Any fit issues to take note of?
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxBtn
                          part={iFitIssues}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="fitIssues"
                          value={values.fitIssues}
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
