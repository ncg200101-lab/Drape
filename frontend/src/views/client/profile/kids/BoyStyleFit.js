import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Divider,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  Button,
  useTheme
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

//-- component
import GenS3Link from 'utils/GenS3Link';
import { FirstUpper } from 'utils/FirstUpper';
import NavTabs from 'views/client/component/profile/NavTabs';
import Left from 'views/client/component/profile/Left';
import DFnewLogger from 'utils/DFnewLogger';
import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import RadioButtonImage from 'views/client/component/profile/RadioButtonImage';
import DFnewImgTag from 'utils/DFnewImgTag';

//-- action
import { kbEditStyleFit, kbGetStyleFit } from 'actions/kids';

const Style_Fit = GenS3Link(
  'landing/images/client/profile/kids/style-fit/boy/style-fit'
);
const Activity_1 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/boy/activity-1'
);
const Activity_2 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/boy/activity-2'
);
const Activity_3 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/boy/activity-3'
);
const Activity_4 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/boy/activity-4'
);
const Activity_5 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/boy/activity-5'
);
const Activity_6 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/boy/activity-6'
);
const Print_1 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/boy/print-1'
);
const Print_2 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/boy/print-2'
);
const Print_3 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/boy/print-3'
);
const Print_4 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/boy/print-4'
);
const Print_5 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/boy/print-5'
);
const Print_6 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/boy/print-6'
);
const Kids_Size_Chart = GenS3Link(
  'landing/images/client/profile/kids/kids-size-chart'
);

const BoyStyleFit = () => {
  //-- get item from localstorage
  const order = localStorage.getItem('order');
  //-- hooks
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let saveReturn = false;
  const { user } = useSelector((state) => state.auth);
  const { kbStyleFit } = useSelector((state) => state.kids);
  useEffect(() => {
    DFnewLogger('kgGetStyleFit__________________________________');
    dispatch(kbGetStyleFit(order));
  }, [dispatch, order]);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  //-- params
  const left = {
    title: `Hi ${FirstUpper(user?.firstName)}`,
    content:
      'Please complete your child style information that will help us to get completed a best FIT',
    image: Style_Fit
  };
  const initVal = {
    topSize: '',
    bottomSize: '',
    shoeSize: '',
    bodyShape: '',
    shirtSleeveLength: 1,
    shirtTorsoLength: 1,
    shirtTorsoWidth: 1,
    pantWaist: 1,
    pantLegsLength: 1,
    pantLegsWidth: 1,
    tShirts: 1,
    sweatShirts: 1,
    poloShirts: 1,
    buttonDowns: 1,
    sweaters: 1,
    jacketsCoats: 1,
    shorts: 1,
    jeans: 1,
    trousersChinos: 1,
    sweatPants: 1,
    shoes: 1,
    pajamas: 1,
    artsCrafts: 1,
    biking: 1,
    dance: 1,
    playingOutside: 1,
    musicalInstruments: 1,
    reading: 1,
    stripes: 1,
    plaid: 1,
    gingham: 1,
    novelty: 1,
    polkaDot: 1,
    camo: 1
  };
  const iTopSize = [
    {
      type: 1,
      value: 'Toddler Sizing'
    },
    {
      type: 0,
      value: '2T'
    },
    {
      type: 0,
      value: '3T'
    },
    {
      type: 0,
      value: '4T'
    },
    {
      type: 1,
      value: 'Kid Sizing'
    },
    {
      type: 0,
      value: '5'
    },
    {
      type: 0,
      value: '6'
    },
    {
      type: 0,
      value: '7'
    },
    {
      type: 0,
      value: '8'
    },
    {
      type: 0,
      value: '10'
    },
    {
      type: 0,
      value: '12'
    },
    {
      type: 0,
      value: '14'
    },
    {
      type: 0,
      value: '16'
    },
    {
      type: 0,
      value: '18'
    }
  ];
  const iShoeSize = [
    {
      type: 1,
      value: 'Toddler Sizing'
    },
    {
      type: 0,
      value: '2 Child'
    },
    {
      type: 0,
      value: '3 Child'
    },
    {
      type: 0,
      value: '4 Child'
    },
    {
      type: 0,
      value: '5 Child'
    },
    {
      type: 0,
      value: '6 Child'
    },
    {
      type: 0,
      value: '7 Child'
    },
    {
      type: 0,
      value: '8 Child'
    },
    {
      type: 0,
      value: '9 Child'
    },
    {
      type: 1,
      value: 'Kid Sizing'
    },
    {
      type: 0,
      value: '10 Child'
    },
    {
      type: 0,
      value: '11 Child'
    },
    {
      type: 0,
      value: '12 Child'
    },
    {
      type: 0,
      value: '13 Child'
    },
    {
      type: 0,
      value: '1 Youth'
    },
    {
      type: 0,
      value: '2 Youth'
    },
    {
      type: 0,
      value: '3 Youth'
    },
    {
      type: 0,
      value: '4 Youth'
    },
    {
      type: 0,
      value: '5 Youth'
    }
  ];
  const iActivity1 = {
    title: 'Arts & Crafts',
    content: ['Often', 'Sometimes', 'Rarely'],
    image: Activity_1
  };
  const iActivity2 = {
    title: 'Biking',
    content: ['Often', 'Sometimes', 'Rarely'],
    image: Activity_2
  };
  const iActivity3 = {
    title: 'Dance',
    content: ['Often', 'Sometimes', 'Rarely'],
    image: Activity_3
  };
  const iActivity4 = {
    title: 'Playing Outside',
    content: ['Often', 'Sometimes', 'Rarely'],
    image: Activity_4
  };
  const iActivity5 = {
    title: 'Musical Instruments',
    content: ['Often', 'Sometimes', 'Rarely'],
    image: Activity_5
  };
  const iActivity6 = {
    title: 'Reading',
    content: ['Often', 'Sometimes', 'Rarely'],
    image: Activity_6
  };
  const iPrint1 = {
    title: 'STRIPES',
    content: ['Yes', 'Maybe', 'Never'],
    image: Print_1
  };
  const iPrint2 = {
    title: 'PLAID',
    content: ['Yes', 'Maybe', 'Never'],
    image: Print_2
  };
  const iPrint3 = {
    title: 'GINGHAM',
    content: ['Yes', 'Maybe', 'Never'],
    image: Print_3
  };
  const iPrint4 = {
    title: 'NOVELTY',
    content: ['Yes', 'Maybe', 'Never'],
    image: Print_4
  };
  const iPrint5 = {
    title: 'POLKA DOT',
    content: ['Yes', 'Maybe', 'Never'],
    image: Print_5
  };
  const iPrint6 = {
    title: 'CAMO',
    content: ['Yes', 'Maybe', 'Never'],
    image: Print_6
  };
  const selectProps = {
    PaperProps: {
      style: {
        maxHeight: 360,
        width: 220
      }
    }
  };

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
                    to="/welcome/basic-info/kids"
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
                    to="/welcome/style-fit/kids/boy"
                    style={{ color: '#ff6c00' }}
                  >
                    Style Fit
                  </Link>
                </Grid>
                <Grid
                  className={`gray-border breadcrumb-tab ${
                    user?.kids[order - 1]?.kStatus < 2 ? 'disabled' : ''
                  }`}
                  item
                  xs={12}
                  sm={3}
                >
                  <Link
                    to="/welcome/price-range/kids/boy"
                    style={{ color: '#232f3e' }}
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
                    to="/welcome/style-custom/kids/boy"
                    style={{ color: '#232f3e' }}
                  >
                    Custom Design & Brands
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Formik
                initialValues={kbStyleFit === null ? initVal : kbStyleFit}
                enableReinitialize
                validationSchema={Yup.object().shape({
                  topSize: Yup.number()
                    .min(0)
                    .max(13)
                    .required('Please select Tops Size'),
                  bottomSize: Yup.number()
                    .min(0)
                    .max(13)
                    .required('Please select Bottoms Size'),
                  shoeSize: Yup.number()
                    .min(0)
                    .max(13)
                    .required('Please select Shoe Size')
                })}
                onSubmit={async (values) => {
                  DFnewLogger('Boy Style Fit/submit:', values);
                  if (saveReturn) {
                    dispatch(kbEditStyleFit(values, order));
                    saveReturn = false;
                  } else {
                    dispatch(kbEditStyleFit(values, order, navigate));
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
                    <Grid container padding="20px" columnSpacing={4}>
                      <Grid item xs={12} lg={8.4}>
                        <Typography className="basic-info-title">
                          What sizes do you prefer for your child?{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} lg={3.6} className="v-center-h-right">
                        <Link
                          className="df-size-chart"
                          onClick={() => showModal()}
                        >
                          Drape Fit Size Chart
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControl
                              error={Boolean(touched.topSize && errors.topSize)}
                              fullWidth
                            >
                              <InputLabel>
                                Tops Size{' '}
                                <span style={{ color: 'red' }}>*</span>
                              </InputLabel>
                              <Select
                                size="small"
                                label="Tops Size *"
                                autoFocus={Boolean(
                                  touched.topSize && errors.topSize
                                )}
                                name="topSize"
                                value={values.topSize}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {iTopSize.map((item, index) => (
                                  <MenuItem
                                    key={index}
                                    value={index}
                                    disabled={item.type === 0 ? false : true}
                                  >
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                              {touched.topSize && errors.topSize && (
                                <FormHelperText
                                  id="standard-weight-helper-text--signup"
                                  error
                                >
                                  {errors.topSize}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControl
                              error={Boolean(
                                touched.bottomSize && errors.bottomSize
                              )}
                              fullWidth
                            >
                              <InputLabel>
                                Bottoms Size{' '}
                                <span style={{ color: 'red' }}>*</span>
                              </InputLabel>
                              <Select
                                size="small"
                                label="Bottoms Size *"
                                autoFocus={Boolean(
                                  touched.bottomSize && errors.bottomSize
                                )}
                                name="bottomSize"
                                value={values.bottomSize}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {iTopSize.map((item, index) => (
                                  <MenuItem
                                    key={index}
                                    value={index}
                                    disabled={item.type === 0 ? false : true}
                                  >
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                              {touched.bottomSize && errors.bottomSize && (
                                <FormHelperText
                                  id="standard-weight-helper-text--signup"
                                  error
                                >
                                  {errors.bottomSize}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControl
                              error={Boolean(
                                touched.shoeSize && errors.shoeSize
                              )}
                              fullWidth
                            >
                              <InputLabel>
                                Shoe Size{' '}
                                <span style={{ color: 'red' }}>*</span>
                              </InputLabel>
                              <Select
                                size="small"
                                label="Shoe Size *"
                                autoFocus={Boolean(
                                  touched.shoeSize && errors.shoeSize
                                )}
                                name="shoeSize"
                                value={values.shoeSize}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {iShoeSize.map((item, index) => (
                                  <MenuItem
                                    key={index}
                                    value={index}
                                    disabled={item.type === 0 ? false : true}
                                  >
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                              {touched.shoeSize && errors.shoeSize && (
                                <FormHelperText
                                  id="standard-weight-helper-text--signup"
                                  error
                                >
                                  {errors.shoeSize}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          Your Child Body Shape?
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonGroup
                          group={['Husky', 'Average', 'Slim']}
                          name="bodyShape"
                          value={values.bodyShape}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          Does your child have any FIT Issue?
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          SHIRT SLEEVE LENGTH
                        </Typography>
                        <RadioButtonGroup
                          group={['Too short', 'None', 'Too long']}
                          name="shirtSleeveLength"
                          value={values.shirtSleeveLength}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          SHIRT TORSO LENGTH
                        </Typography>
                        <RadioButtonGroup
                          group={['Too short', 'None', 'Too long']}
                          name="shirtTorsoLength"
                          value={values.shirtTorsoLength}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          SHIRT TORSO WIDTH
                        </Typography>
                        <RadioButtonGroup
                          group={['Too tight', 'None', 'Too loose']}
                          name="shirtTorsoWidth"
                          value={values.shirtTorsoWidth}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          PANT WAIST
                        </Typography>
                        <RadioButtonGroup
                          group={['Too tight', 'None', 'Too loose']}
                          name="pantWaist"
                          value={values.pantWaist}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          PANT LEGS LENGTH (INSEAM)
                        </Typography>
                        <RadioButtonGroup
                          group={['Too short', 'None', 'Too long']}
                          name="pantLegsLength"
                          value={values.pantLegsLength}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          PANT LEGS WIDTH
                        </Typography>
                        <RadioButtonGroup
                          group={['Too tight', 'None', 'Too loose']}
                          name="pantLegsWidth"
                          value={values.pantLegsWidth}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          Please share the following items you like to receive
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          T-SHIRTS
                        </Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="tShirts"
                          value={values.tShirts}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          SWEAT SHIRTS
                        </Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="sweatShirts"
                          value={values.sweatShirts}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          POLO SHIRTS
                        </Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="poloShirts"
                          value={values.poloShirts}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          BUTTON-DOWNS
                        </Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="buttonDowns"
                          value={values.buttonDowns}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          SWEATERS
                        </Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="sweaters"
                          value={values.sweaters}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          JACKETS & COATS
                        </Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="jacketsCoats"
                          value={values.jacketsCoats}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          SHORTS
                        </Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="shorts"
                          value={values.shorts}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          JEANS
                        </Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="jeans"
                          value={values.jeans}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          TROUSERS & CHINOS
                        </Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="trousersChinos"
                          value={values.trousersChinos}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          SWEATPANTS
                        </Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="sweatPants"
                          value={values.sweatPants}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          SHOES
                        </Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="shoes"
                          value={values.shoes}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">
                          PAJAMAS
                        </Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="pajamas"
                          value={values.pajamas}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          How often does your child do the following activities?
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iActivity1}
                          name="artsCrafts"
                          value={values.artsCrafts}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iActivity2}
                          name="biking"
                          value={values.biking}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iActivity3}
                          name="dance"
                          value={values.dance}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iActivity4}
                          name="playingOutside"
                          value={values.playingOutside}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iActivity5}
                          name="musicalInstruments"
                          value={values.musicalInstruments}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iActivity6}
                          name="reading"
                          value={values.reading}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          What type of prints does your child prefer?
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iPrint1}
                          name="stripes"
                          value={values.stripes}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iPrint2}
                          name="plaid"
                          value={values.plaid}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iPrint3}
                          name="gingham"
                          value={values.gingham}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iPrint4}
                          name="novelty"
                          value={values.novelty}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iPrint5}
                          name="polkaDot"
                          value={values.polkaDot}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iPrint6}
                          name="camo"
                          value={values.camo}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
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
      <Modal
        open={open}
        title="Drape Fit Size Chart"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="700px"
      >
        <DFnewImgTag
          src={`${Kids_Size_Chart}.webp`}
          fallback={`${Kids_Size_Chart}.jpg`}
          width="100%"
          lzheight={`auto`}
          style={{ minHeight: '152px' }}
          alt="Kids Size Chart"
        />
      </Modal>
    </>
  );
};

export default BoyStyleFit;
