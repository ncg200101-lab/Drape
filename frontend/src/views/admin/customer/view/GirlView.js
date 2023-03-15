import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Divider,
  Grid,
  Box,
  Button,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  useTheme,
  TextField,
  TextareaAutosize
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

//-- component
import { FirstUpper } from 'utils/FirstUpper';
import BrandSelector from 'views/client/component/profile/BrandSelector';
import ColorRect from 'views/client/component/profile/ColorRect';
import CustomCheckbox from 'views/client/component/profile/CustomCheckbox';
import DFnewImgTag from 'utils/DFnewImgTag';
import DFnewLogger from 'utils/DFnewLogger';
import GenS3Link from 'utils/GenS3Link';
import NavTabs from 'views/client/component/profile/NavTabs';
import PriceRadioGroup from 'views/client/component/profile/PriceRadioGroup';
import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import RadioButtonImage from 'views/client/component/profile/RadioButtonImage';

//-- action
import {
  kEditBasicInfo,
  kGetBasicInfo,
  kgEditStyleFit,
  kgGetStyleFit,
  kgEditPriceRange,
  kgGetPriceRange,
  kgEditStyleCustom,
  kgGetStyleCustom
} from 'actions/kids';

import InfoTable from './InfoTable';

const Logo = GenS3Link('landing/images/logo');
const Activity_1 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/girl/activity-1'
);
const Activity_2 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/girl/activity-2'
);
const Activity_3 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/girl/activity-3'
);
const Activity_4 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/girl/activity-4'
);
const Activity_5 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/girl/activity-5'
);
const Activity_6 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/girl/activity-6'
);
const Print_1 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/girl/print-1'
);
const Print_2 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/girl/print-2'
);
const Print_3 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/girl/print-3'
);
const Print_4 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/girl/print-4'
);
const Print_5 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/girl/print-5'
);
const Print_6 = GenS3Link(
  'landing/images/client/profile/kids/style-fit/girl/print-6'
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

const GirlView = () => {
  //-- get item from localstorage
  const order = localStorage.getItem('order');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { kBasicInfo, kgStyleFit, kgPriceRange, kgStyleCustom } = useSelector(
    (state) => state.kids
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(kGetBasicInfo(order));
    dispatch(kgGetStyleFit(order));
    dispatch(kgGetPriceRange(order));
    dispatch(kgGetStyleCustom(order));
  }, [dispatch, order]);

  const initBasicInfo = {
    name: '',
    birthday: new Date(),
    lookingFor: '',
    relationShip: '',
    heightFt: 0,
    heightIn: 0,
    weightLbs: '',
    childPersonality: [],
    preferedSize: '',
    colors: []
  };
  const iHeightFt = ['--', '1', '2', '3', '4', '5', '6'];
  const iHeightIn = [
    '--',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11'
  ];
  const iChildPersonality = {
    title: 'Your Child Personality?',
    items: [
      'Thoughtful',
      'Sporty',
      'Shy',
      'Outgoing',
      'Artistic',
      'Chatty',
      'Bookworm',
      'Curious',
      'Sassy',
      'Funny',
      'Independent',
      'Kind',
      'Daredevil',
      'Serious',
      'Adventurous',
      'Confident'
    ]
  };
  const initStyleFit = {
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
    topsBlouses: 1,
    sweatShirts: 1,
    sweaters: 1,
    jacketsCoats: 1,
    dressesRompers: 1,
    shorts: 1,
    leggings: 1,
    jeans: 1,
    pants: 1,
    skirts: 1,
    accessories: 1,
    shoes: 1,
    pajamas: 1,
    artsCrafts: 1,
    biking: 1,
    dance: 1,
    playingOutside: 1,
    musicalInstruments: 1,
    reading: 1,
    stripes: 1,
    floral: 1,
    animalPrint: 1,
    polkaDots: 1,
    plaid: 1,
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
    title: 'FLORAL',
    content: ['Yes', 'Maybe', 'Never'],
    image: Print_2
  };
  const iPrint3 = {
    title: 'ANIMAL PRINT',
    content: ['Yes', 'Maybe', 'Never'],
    image: Print_3
  };
  const iPrint4 = {
    title: 'POLKA DOTS',
    content: ['Yes', 'Maybe', 'Never'],
    image: Print_4
  };
  const iPrint5 = {
    title: 'PLAID',
    content: ['Yes', 'Maybe', 'Never'],
    image: Print_5
  };
  const iPrint6 = {
    title: 'CAMO',
    content: ['Yes', 'Maybe', 'Never'],
    image: Print_6
  };
  const initPriceRange = {
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
  const initStyleCustom = {
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
      <InfoTable />
      <Box className="fx-sm-padding">
        <Formik
          initialValues={kBasicInfo === null ? initBasicInfo : kBasicInfo}
          enableReinitialize
        >
          {({
            errors,
            handleBlur,
            handleChange,
            setFieldValue,
            touched,
            values
          }) => (
            <Form noValidate>
              <Grid container>
                <Grid container columnSpacing={4} padding="20px">
                  <Grid item xs={12} sm={6}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          Your Child Name?{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>
                            Name <span style={{ color: 'red' }}>*</span>
                          </InputLabel>
                          <OutlinedInput
                            disabled
                            size="small"
                            label="Name *"
                            type="text"
                            name="name"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          Your Child Birthday?{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disabled
                              className="small-date-picker"
                              name="birthday"
                              value={values.birthday}
                              onChange={(value) => {
                                const date = new Date(Date.parse(value));
                                setFieldValue('birthday', date);
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          FIT you are looking for?{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <RadioButtonGroup
                          disabled
                          group={["Girl's Product", "Boy's Product"]}
                          name="lookingFor"
                          value={values.lookingFor}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          Relationship with your child?{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <RadioButtonGroup
                          disabled
                          group={['Father', 'Mother', 'Other']}
                          name="relationShip"
                          value={values.relationShip}
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
                  <Grid item xs={12} sm={6}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          Your Child Height?{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <FormControl fullWidth>
                              <InputLabel>
                                ft. <span style={{ color: 'red' }}>*</span>
                              </InputLabel>
                              <Select
                                disabled
                                size="small"
                                label="ft. *"
                                value={values.heightFt}
                                name="heightFt"
                                onBlur={handleBlur}
                                onChange={handleChange}
                              >
                                {iHeightFt.map((item, index) => (
                                  <MenuItem key={index} value={index}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth>
                              <InputLabel>in.</InputLabel>
                              <Select
                                disabled
                                size="small"
                                label="in."
                                value={values.heightIn}
                                name="heightIn"
                                onBlur={handleBlur}
                                onChange={handleChange}
                              >
                                {iHeightIn.map((item, index) => (
                                  <MenuItem key={index} value={index}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          Your Child Weight?{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>
                            lbs. <span style={{ color: 'red' }}>*</span>
                          </InputLabel>
                          <OutlinedInput
                            disabled
                            size="small"
                            label="lbs. *"
                            value={values.weightLbs}
                            type="number"
                            name="weightLbs"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomCheckbox
                      disabled
                      content={iChildPersonality}
                      touched={touched}
                      errors={errors}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      name="childPersonality"
                      value={values.childPersonality}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          What size does your child prefer to wear?
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <RadioButtonGroup
                          disabled
                          group={['Bottom Size', 'Top Size', 'Shoe Size']}
                          name="preferedSize"
                          value={values.preferedSize}
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
                    <ColorRect
                      disabled
                      touched={touched}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="colors"
                      value={values.colors}
                      subject="your child"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <Formik
          initialValues={kgStyleFit === null ? initStyleFit : kgStyleFit}
          enableReinitialize
        >
          {({
            errors,
            handleBlur,
            handleChange,
            setFieldValue,
            touched,
            values
          }) => (
            <Form noValidate>
              <Grid container padding="20px" columnSpacing={4}>
                <Grid item xs={12}>
                  <Typography className="basic-info-title">
                    What sizes do you prefer for your child?{' '}
                    <span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControl fullWidth>
                        <InputLabel>
                          Tops Size <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <Select
                          disabled
                          size="small"
                          name="topSize"
                          value={values.topSize}
                          onBlur={handleBlur}
                          onChange={handleChange}
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
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControl fullWidth>
                        <InputLabel>
                          Bottoms Size <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <Select
                          disabled
                          size="small"
                          name="bottomSize"
                          value={values.bottomSize}
                          onBlur={handleBlur}
                          onChange={handleChange}
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
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControl fullWidth>
                        <InputLabel>
                          Shoe Size <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <Select
                          disabled
                          size="small"
                          name="shoeSize"
                          value={values.shoeSize}
                          onBlur={handleBlur}
                          onChange={handleChange}
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    TOPS & BLOUSES
                  </Typography>
                  <RadioButtonGroup
                    disabled
                    group={['Often', 'Sometimes', 'Rarely']}
                    name="topsBlouses"
                    value={values.topsBlouses}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography className="basic-info-sub-title">
                    SWEATSHIRTS
                  </Typography>
                  <RadioButtonGroup
                    disabled
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
                    SWEATERS
                  </Typography>
                  <RadioButtonGroup
                    disabled
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
                    disabled
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
                    DRESSES & ROMPERS
                  </Typography>
                  <RadioButtonGroup
                    disabled
                    group={['Often', 'Sometimes', 'Rarely']}
                    name="dressesRompers"
                    value={values.dressesRompers}
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
                    disabled
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
                    LEGGINGS
                  </Typography>
                  <RadioButtonGroup
                    disabled
                    group={['Often', 'Sometimes', 'Rarely']}
                    name="leggings"
                    value={values.leggings}
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
                    disabled
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
                    PANTS
                  </Typography>
                  <RadioButtonGroup
                    disabled
                    group={['Often', 'Sometimes', 'Rarely']}
                    name="pants"
                    value={values.pants}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography className="basic-info-sub-title">
                    SKIRTS
                  </Typography>
                  <RadioButtonGroup
                    disabled
                    group={['Often', 'Sometimes', 'Rarely']}
                    name="skirts"
                    value={values.skirts}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography className="basic-info-sub-title">
                    ACCESSORIES
                  </Typography>
                  <RadioButtonGroup
                    disabled
                    group={['Often', 'Sometimes', 'Rarely']}
                    name="accessories"
                    value={values.accessories}
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
                    group={iPrint2}
                    name="floral"
                    value={values.floral}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <RadioButtonImage
                    disabled
                    group={iPrint3}
                    name="animalPrint"
                    value={values.animalPrint}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <RadioButtonImage
                    disabled
                    group={iPrint4}
                    name="polkaDots"
                    value={values.polkaDots}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <RadioButtonImage
                    disabled
                    group={iPrint5}
                    name="plaid"
                    value={values.plaid}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <RadioButtonImage
                    disabled
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
              </Grid>
            </Form>
          )}
        </Formik>
        <Formik
          initialValues={kgPriceRange == null ? initPriceRange : kgPriceRange}
          enableReinitialize
        >
          {({ errors, handleChange, touched, values }) => (
            <Form noValidate>
              <Grid container padding="20px">
                <Grid item xs={12}>
                  <Typography className="basic-info-title">
                    Help Us Know your Budget
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <PriceRadioGroup
                    disabled
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
              </Grid>
            </Form>
          )}
        </Formik>
        <Formik
          initialValues={
            kgStyleCustom == null ? initStyleCustom : kgStyleCustom
          }
          enableReinitialize
        >
          {({ errors, handleBlur, handleChange, touched, values }) => (
            <Form noValidate>
              <Grid container padding="20px">
                <Grid item xs={12}>
                  <Typography className="basic-info-title">
                    Please do click to upload any reference images / design you
                    want your stylist to work for you
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography
                        className="basic-info-sub-title"
                        align="center"
                      >
                        First Design
                      </Typography>
                      <Box>
                        <DFnewImgTag
                          src={
                            values.dsgnImgUrl1st ? `${Logo}.png` : `${Logo}.png`
                          }
                          height="100%"
                          width="100%"
                          lzheight={'100%'}
                          alt="Drape Fit Inc."
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography
                        className="basic-info-sub-title"
                        align="center"
                      >
                        Second Design
                      </Typography>
                      <Box>
                        <DFnewImgTag
                          src={
                            values.dsgnImgUrl2nd ? `${Logo}.png` : `${Logo}.png`
                          }
                          height="100%"
                          width="100%"
                          lzheight={'100%'}
                          alt="Drape Fit Inc."
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography
                        className="basic-info-sub-title"
                        align="center"
                      >
                        Third Design
                      </Typography>
                      <Box>
                        <DFnewImgTag
                          src={
                            values.dsgnImgUrl3rd ? `${Logo}.png` : `${Logo}.png`
                          }
                          height="100%"
                          width="100%"
                          lzheight={'100%'}
                          alt="Drape Fit Inc."
                        />
                      </Box>
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
                    disabled
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
                  <FormControl fullWidth>
                    <TextareaAutosize
                      disabled
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
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default GirlView;
